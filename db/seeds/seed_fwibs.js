var pg = require('../db_setup');


var seedFwib = function() {
    // return pg('user_game').truncate()
    // .then(function() {
      return pg('fwibs').insert([
        {
          fwib_content: 'This little piggy went to the',
          game_hash: '458d21',
          username: 'Player1'
        },
        {
          fwib_content: 'dentist. After a painful tooth pull',
          game_hash: '458d21',
          username: 'Player2'
        },
        {
          fwib_content: 'the piggy had a bowl of',
          game_hash: '458d21',
          username: 'Player1'
        },
        {
          fwib_content: 'pain killers. It really hurt. So',
          game_hash: '458d21',
          username: 'Player2'
        },
        {
          fwib_content: 'he slept a lot. The End',
          game_hash: '458d21',
          username: 'Player1'
        },
      ])
    // })
    .catch(function(error) {
      console.error('error seeding fwibs', error)
    })
};

seedFwib();


