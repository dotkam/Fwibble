var pg = require('../db_setup');

var seedGame = function() {
    // return pg('user_game').truncate()
    // .then(function() {
      return pg('games').insert([
        {
          game_hash: '32a3f4',
          game_title: 'This is game'
        },
        {
          game_hash: '458d21',
          game_title: 'Yes, this is Dog'
        }
      ])
    // })
    .catch(function(error) {
      console.error('error seeding games', error)
    })
};

seedGame();

