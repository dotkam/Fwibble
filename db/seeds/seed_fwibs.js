var pg = require('../db_setup');


var seedFwib = function() {
    // return pg('user_game').truncate()
    // .then(function() {
      return pg('fwibs').insert([
        {
          fwib_content: 'This little piggy went to the',
          game_id: 2,
          user_id: 1
        },
        {
          fwib_content: 'dentist. After a painful tooth pull',
          game_id: 2,
          user_id: 2
        },
        {
          fwib_content: 'the piggy had a bowl of',
          game_id: 2,
          user_id: 1
        },
        {
          fwib_content: 'pain killers. It really hurt. So',
          game_id: 2,
          user_id: 2
        },
        {
          fwib_content: 'he slept a lot. The End',
          game_id: 2,
          user_id: 1
        },
      ])
    // })
    .catch(function(error) {
      console.error('error seeding fwibs', error)
    })
};

seedFwib();


