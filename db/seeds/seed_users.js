var pg = require('../db_setup');

var seedUser = function() {
  // pg('users').truncate()
  //   .then(function() {
      return pg('users').insert([
        {
          user_id: 1,
          username: 'Player1',
          active_room: 1
        },
        {
          user_id: 2,
          username: 'Player2',
          active_room: 1
        }
      ])
    // })
    .catch(function(error) {
      console.error('error seeding messages', error)
    })
};

seedUser();



