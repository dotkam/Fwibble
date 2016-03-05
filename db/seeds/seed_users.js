var pg = require('pg');

var pgConConfig = {
  database: "development",
  host: "localhost",
  port: 5432
}

var pgClient = new pg.Client(pgConConfig);
pgClient.connect(function(err){
    if (err){
         return console.log('could not connect to postgres', err);
    }
})

var sqlInsertUser = 'INSERT INTO "users" (user_id, username, active_room) VALUES ($1, $2, $3) RETURNING user_id';
var user_id = 1;
var username = "Player1";
var active_room = 1;
var user_id2 = 2;
var username2 = "Player2";
var active_room2 = 1;

pgClient.query(sqlInsertUser, [user_id, username, active_room], function (err, result){
                if (err){
                  return console.log('error inserting user', err);
                }
              })

pgClient.query(sqlInsertUser, [user_id2, username2, active_room2], function (err, result){
                if (err){
                  return console.log('error inserting user', err);
                }
              })

// exports.seed = function(knex, Promise) {
//   return knex('users').truncate()
//     .then(function() {
//       return knex('users').insert([
//         {
//           username: 'Player1'
//         },
//         {
//           username: 'Player2'
//         }
//       ])
//     })
//     .catch(function(error) {
//       console.error('error seeding users', error)
//     })
// };


