exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('games_users', function(table){
    table.increments('id').primary();
    table.integer('user_id').references('users.user_id');
    table.string('game_hash').references('games.game_hash');
    table.boolean('favorites').defaultTo(false);
  })
  .then(function(){
    return knex.schema.createTableIfNotExists('games_users', function(table){
        table.increments('id').primary();
        table.integer('user_id').references('users.user_id');
        table.string('game_hash').references('games.game_hash');
        table.boolean('favorites').defaultTo(false);;
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('games_users');
};