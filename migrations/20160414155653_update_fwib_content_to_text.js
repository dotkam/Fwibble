
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games_users', function(table){
    table.increments('id').primary();
    table.integer('user_id').references('users.user_id');
    table.string('game_hash').references('games.game_hash');
  });
};

exports.down = function(knex, Promise) {
  
};
