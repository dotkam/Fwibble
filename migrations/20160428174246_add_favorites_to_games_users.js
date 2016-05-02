exports.up = function(knex, Promise) {
  return  knex.schema.table('games_users', function(table){
            table.boolean('favorites').defaultsTo(false);
          })
          .then(function(){
            return  knex.schema.table('games_users', function(table){
                      table.boolean('favorites').defaultsTo(false);
                    })
          });
};

exports.down = function(knex, Promise) {
  return  knex.schema.table('games_users', function(table){
            table.dropColumn('favorites');
          })
};