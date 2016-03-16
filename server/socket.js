// Keep track of which names are used so that there are no duplicates
var Fwib = require('../app/actions/fwibs.js')
var User = require('../app/actions/users.js')
var Game = require('../app/actions/games.js')

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
    userNames.claim(name);

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
  socket.on('send:fwib', function (data) {
    var fwib_content = data.text;
    var user_id;
    var game_id;
    socket.broadcast.emit('send:fwib', {
      user: data.user,
      text: data.text
    });
    User.findIdByUsername(data.user)
      .then(function(res){
        user_id = res[0].user_id;
      })
      .then(function(){
        User.findActiveGame(user_id)
          .then(function(res){
            var game_hash = res[0].active_game;
            console.log('findIdByUsername', user_id);
            console.log('findActiveGame', game_hash);
            Game.findIdByHash(game_hash)
              .then(function(res){
                game_id = res[0].game_id;
                console.log('IdByHash', game_id)
              })
              .then(function(){    
                var fwibData = {
                  fwib_content: data.text,
                  game_id: game_id,
                  user_id: user_id
                }
                console.log('fwibData', fwibData)
                Fwib.create(fwibData)
              })
          })
      });
  });

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

