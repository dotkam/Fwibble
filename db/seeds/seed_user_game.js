var pg = require('../db_setup');

var seedUserGame = function() {
    return pg('user_game').truncate()
    .then(function() {
      return pg('user_game').insert([
        {
          user_id: 1,
          game_id: 2
        },
        {
          user_id: 2,
          game_id: 2
        }
      ])
    // })
    .catch(function(error) {
      console.error('error seeding games', error)
    })
};

seedUserGame();


