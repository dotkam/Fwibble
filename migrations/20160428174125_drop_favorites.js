exports.up = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games_users')
  .then(function(){
    return knex.schema.dropTableIfExists('games_users');
  });
};

exports.down = function(knex, Promise) {
  
};