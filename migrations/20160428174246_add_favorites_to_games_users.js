exports.up = function(knex, Promise) {
  // knex.schema.table('games_users', function(table){
  //   table.boolean('favorites').defaultsTo(false);
  // });
};

exports.down = function(knex, Promise) {
  knex.schema.table('games_users', function(table){
    table.dropColumn('favorites');
  })
};