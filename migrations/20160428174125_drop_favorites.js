exports.up = function(knex, Promise) {
  knex.dropTable('games_users');
};

exports.down = function(knex, Promise) {
  
};