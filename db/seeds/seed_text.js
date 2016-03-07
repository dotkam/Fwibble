var pg = require('../db_setup');


var seedText = function() {
  //   return pg('user_room').truncate()
  //   .then(function() {
      return pg('texts').insert([
        {
          text_id: 1,
          text_content: 'This little piggy went to the',
          room_id: 1,
          user_id: 1
        },
        {
          text_id: 2,
          text_content: 'dentist. After a painful tooth pull',
          room_id: 1,
          user_id: 2
        },
        {
          text_id: 3,
          text_content: 'the piggy had a bowl of',
          room_id: 1,
          user_id: 1
        },
        {
          text_id: 4,
          text_content: 'pain killers. It really hurt. So',
          room_id: 1,
          user_id: 2
        },
        {
          text_id: 5,
          text_content: 'he slept a lot. The End',
          room_id: 1,
          user_id: 1
        },
      ])
    // })
    .catch(function(error) {
      console.error('error seeding rooms', error)
    })
};

seedText();


