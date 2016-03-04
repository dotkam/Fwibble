exports.seed = function(knex, Promise) {
  return knex('rooms').truncate()
    .then(function() {
      return knex('rooms').insert([
        {
          room_hash: null
          password: null
        }
      ])
    })
    .catch(function(error) {
      console.error('error seeding rooms', error)
    })
};

