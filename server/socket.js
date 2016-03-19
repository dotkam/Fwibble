// Keep track of which names are used so that there are no duplicates
var Fwib = require('../app/actions/fwibs.js')
var User = require('../app/actions/users.js')
var Game = require('../app/actions/games.js')
var Session = require('../app/actions/sessions.js')

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
  
  socket.on('help', function(data){
    console.log('socket data', data.user)
    name = data.user;
    userNames.claim(name); // Grab all users for room // Good lord please deprecate this

    socket.emit('init', {
      name: data.user,
      users: userNames.get()
    });
    socket.broadcast.emit('user:join', {
      name: data.user,
      users: userNames.get()
    });

  })
  // send the new user their name and a list of users

  // notify other clients that a new user has joined

  // broadcast a user's fwib to other users
  // and store in DB
  socket.on('send:fwib', function (data) {
    var fwib_content = data.text;
    var gamehash;

    socket.broadcast.emit('send:fwib', {
      user: data.user,
      text: data.text
    })
    User.findActiveGame(data.user)
      .then(function(res){
        game_hash = res;
        console.log('sendFwib got game_hash', game_hash)
      })
      .then(function(){
        var fwibData = {
          fwib_content: data.text,
          game_hash: game_hash,
          username: data.user
        }
        Fwib.create(fwibData)
      })
    });
  // Broadcasts all open games to users
  socket.on('lobby:games', function(games){
    var client = this;
    Game.allJoinable()
      .then(function(res){
        // quit talking to yourself
        if(res.length !== games.length){
          client.emit('update:games:joinable', {
            games: res
          });
          socket.broadcast.emit('update:games:joinable', {
            games: res
          });
        }
      })
  });
  // Creates game room and sends its hash back to creator
  socket.on('create:game_room', function(data){
    console.log('socket hears create:game_room');
    Game.create({game_creator: data.username})
      .then(function(res){
        console.log('Game create res:', res);
      })
  })
  // Passes in updated turn counter and broadcasts it to other users
  socket.on('change:turn', function(turn){
    socket.broadcast.emit('update:turn', {
      turn:turn
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

