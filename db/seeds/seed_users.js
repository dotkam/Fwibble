var pg = require('../db_setup');

var seedUser = function() {
  // pg('users').truncate()
  //   .then(function() {
      return pg('users').insert([
        {
          username: 'Player1',
          active_room: '458d21'
        },
        {
          username: 'Player2',
          active_room: '458d21'
        }
      ])
    // })
    .catch(function(error) {
      console.error('error seeding messages', error)
    })
};

seedUser();



