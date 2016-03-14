// Keep track of which names are used so that there are no duplicates
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
  var name = userNames.getGuestName();

  socket.on('help', function(data){


    socket.emit('init', {
      name: data.user,
      users: userNames.get()
    });
    socket.broadcast.emit('user:join', {
      name: data.user
    });
  })
  // send the new user their name and a list of users

  // notify other clients that a new user has joined

  // broadcast a user's fwib to other users
  socket.on('send:fwib', function (data) {
    socket.broadcast.emit('send:fwib', {
      user: name,
      text: data.text
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
    socket.broadcast.emit('user:left', {
      name: name
    });
    userNames.free(name);
  });
};
