// Keep track of which names are used so that there are no duplicates
// var Fwib = require('../app/actions/fwibs.js')
// var User = require('../app/actions/users.js')
// var Game = require('../app/actions/games.js')
// var Session = require('../app/actions/sessions.js')

var Fwib = require('./models/fwibModel.js')
var User = require('./models/userModel.js')
var Game = require('./models/gameModel.js')
var Session = require('./models/sessionModel.js')

var userNames = (function () {
  var names = {};

  var claim = function (name) {
    if (!name || names[name]) {
      return false;
    } else {
      names[name] = true;
      return true;
    }
  };

  // find the lowest unused "guest" name and claim it
  var getGuestName = function () {
    var name,
      nextUserId = 1;

    do {
      name = 'Guest ' + nextUserId;
      nextUserId += 1;
    } while (!claim(name));

    return name;
  };

  // serialize claimed names as an array
  var get = function () {
    var res = [];
    for (user in names) {
      res.push(user);
    }

    return res;
  };

  var free = function (name) {
    if (names[name]) {
      delete names[name];
    }
  };

  return {
    claim: claim,
    free: free,
    get: get,
    getGuestName: getGuestName
  };
}());

// export function for listening to the socket
module.exports = function (socket) {
  var name;
  
  // send the new user their name and a list of users
  // notify other clients that a new user has joined
  socket.on('fetch:users', function(data){ // Validate that user belongs in room
    console.log('fetch:users data', data)
    // name = data.user; // May not need this
    // userNames.claim(name); // Grab all users for room // Good lord please deprecate this
    var client = this;
    Game.allUser(data.game_hash)
      .then(function(res){
        console.log('ALL USERS', res);
        if( data.users.length !== res.length){
          socket.emit('init', {
            user: data.user,
            users: res // userNames.get()
          });
          socket.broadcast.to(data.game_hash).emit('user:join', {
            name: data.user,
            users: res // userNames.get()
          });
        };
      })
  });
  // Subscribe a user to a room's socket channel
  socket.on('subscribe', function(room){
    console.log('SUBSCRIBED TO ROOM:', room);
    socket.join(room);
  });
  // Unsubscribe a user from a room's socket channel
  socket.on('unsubscribe', function(room){
    console.log('UNSUBSCRIBED FROM  ROOM:', room);
    socket.leave(room);
  });  
  // broadcast a user's fwib to other users
  // and store in DB
  socket.on('send:fwib', function (data) {
    var fwib_content = data.text;
    var gamehash;

    socket.broadcast.to(data.game_hash).emit('send:fwib', {
      user: data.user,
      text: data.text
    });
    var fwibData = {
      fwib_content: data.text,
      game_hash: data.game_hash,
      username: data.user
    }
    Fwib.create(fwibData);
  })
  // Fetch open games and broadcast to users
  socket.on('lobby:games', function(games){
    var client = this;
    Game.allJoinable()
      .then(function(res){
        if(res.length !== games.length){ // need better logic to check that games are different
          client.emit('update:games:joinable', {
            games: res
          });
          socket.broadcast.emit('update:games:joinable', { // This may be unnecessary
            games: res
          });
        }
      })
  });
  // Creates game room and sends its hash back to creator
  socket.on('create:game_room', function(data){
    var client = this;
    Game.create({game_creator: data.username})
      .then(function(res){
        console.log('Game create res:', res);
        User.addActiveRoom(data.username, res.game_hash)
          .then(function(res2){
            console.log('CREATE CHANNEL:', res.game_hash) 
            client.emit('enter:game', {username: data.username, active_game: res.game_hash})
          })
      })
  });
  // Adds active_game to user
  socket.on('join:game', function(data){
    var client = this;
    console.log('GOT JOINGAME', data)
    User.addActiveRoom(data.username, data.game_hash)
      .then(function(res){
        console.log('Added Active Room')
        Game.allUser(data.game_hash)
          .then(function(res2){
            console.log('GOT ALL USERS:', res, res2)
            socket.broadcast.to(data.game_hash).emit('update:users', {users: res2}); // CHANNEL EMIT USER JOIN
            client.emit('update:users', {users: res2});
          })
      })
  });
  socket.on('leave:game', function(data){
    var client = this;
    console.log('LEAVING FROM THE SERVER', data)
    User.deleteActiveRoom(data.username)
      .then(function(res){
        socket.emit('update:active_game', {game_hash: ''});
        Game.allUser(data.game_hash)
          .then(function(res2){
            console.log('LEAVE DATA:', res, res2)
            socket.broadcast.to(data.game_hash).emit('update:users', {users: res2}); // CHANNEL EMIT USER LEAVE
            client.emit('update:users', {users: res2});
          })
      })
  });
  // Passes in updated turn counter and broadcasts it to other users
  socket.on('change:turn', function(data){
    socket.broadcast.to(data.game_hash).emit('update:turn', {
      turn: data.turn
    });
  });

  // Runs session deletion when a user logs out
  socket.on('logout', function(data){
    console.log('YOURE LOGGING OUT', data)
    Session.deleteByUsername(data.username);
  });

  // Updates game state for users in game
  socket.on('update:game:inprogress', function(data){
    socket.broadcast.to(data.game_hash).emit('game:start',{}) // data.to //=> channel id //=> socket.broadcast.to(game_hash).
    Game.updateToInProgress(data.game_hash)
  })

  //When game timer ends, changes game status to completed
  socket.on('endtimer', function(data){
    console.log('GAME OVER', data)
    socket.broadcast.to(data.gamehash).emit('game:end',{})
    Game.updateToCompleted(data.gamehash);
  });

  //Query game title when game room is entered
  socket.on('title', function(data){
    Game.titleByHash(data.gamehash)
      .then(function(res) {
        console.log("title.res", res)
        socket.emit('title:update', {title: res})
      });
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    userNames.free(name);
    socket.broadcast.emit('user:left', {
      name: name,
      users: userNames.get()
    });
  });
};

