var pg = require('../db_setup');

var seedRoom = function() {
  //   return pg('user_room').truncate()
  //   .then(function() {
      return pg('rooms').insert([
        {
          room_id: 1,
          room_hash: '32a3f4'
        },
        {
          room_id: 2,
          room_hash: '458d21'
        }
      ])
    // })
    .catch(function(error) {
      console.error('error seeding rooms', error)
    })
};

seedRoom();

