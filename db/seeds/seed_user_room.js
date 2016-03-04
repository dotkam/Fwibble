exports.seed = function(knex, Promise) {
  return knex('user_room').truncate()
    .then(function() {
      return knex('user_room').insert([
        {
          user_id: 1,
          room_id: 1
        },
        {
          user_id: 2,
          room_id: 1
        }
      ])
    })
    .catch(function(error) {
      console.error('error seeding rooms', error)
    })
};

