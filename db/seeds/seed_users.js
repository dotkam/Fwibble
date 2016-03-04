
exports.seed = function(knex, Promise) {
  return knex('users').truncate()
    .then(function() {
      return knex('users').insert([
        {
          username: 'Player1',
          password: null
        },
        {
          username: 'Player2',
          password: null
        }
      ])
    })
    .catch(function(error) {
      console.error('error seeding users', error)
    })
};


