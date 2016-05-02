exports.up = function(knex, Promise) {
  knex.schema.dropTable('games_users');
};

exports.down = function(knex, Promise) {
  
};