exports.up = function(knex, Promise) {
  knex.schema.createTableIfNotExists('games_users', function(table){
    table.increments('id').primary();
    table.integer('user_id').references('users.user_id');
    table.string('game_hash').references('games.game_hash');
    table.boolean('favorites').defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('games_users');
};