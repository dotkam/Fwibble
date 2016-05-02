exports.up = function(knex, Promise) {
  return knex.schema.dropTable('games_users');
};

exports.down = function(knex, Promise) {
  
};