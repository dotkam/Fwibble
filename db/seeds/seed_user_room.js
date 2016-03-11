var pg = require('../db_setup');

var seedUserRoom = function() {
  //   return pg('user_room').truncate()
  //   .then(function() {
      return pg('user_room').insert([
        {
          user_id: 1,
          room_id: 2
        },
        {
          user_id: 2,
          room_id: 2
        }
      ])
    // })
    .catch(function(error) {
      console.error('error seeding rooms', error)
    })
};

seedUserRoom();


