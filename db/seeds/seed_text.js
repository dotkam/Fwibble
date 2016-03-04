exports.seed = function(knex, Promise) {
  return knex('text').truncate()
    .then(function() {
      return knex('text').insert([
        {
          text_content: "This is an example of a",
          room_id: 1,
          user_id: 1
        },
        {
          text_content: "fwibble in action.  Three more words",
          room_id: 1,
          user_id: 2
        }
      ])
    })
    .catch(function(error) {
      console.error('error seeding user_room', error)
    })
};

