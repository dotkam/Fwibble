var pg = require('../db_setup');

var seedRoom = function() {
  //   return pg('user_room').truncate()
  //   .then(function() {
      return pg('rooms').insert([
        {
          room_hash: '32a3f4',
          room_title: 'This is room'
        },
        {
          room_hash: '458d21',
          room_title: 'Yes, this is Dog'
        }
      ])
    // })
    .catch(function(error) {
      console.error('error seeding rooms', error)
    })
};

seedRoom();

