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


var sqlInsertUserRoom = 'INSERT INTO "user_room" (user_room_id, user_id, room_id) VALUES ($1, $2, $3)';
var user_room_id = 1;
var user_id = 1;
var room_id = 1;
var user_room_id2 = 2;
var user_id2 = 2;
var room_id2 = 1;

pgClient.query(sqlInsertUserRoom, [user_room_id, user_id, room_id], function (err, result){
                if (err){
                  return console.log('error inserting user_room', err);
                }
              })

pgClient.query(sqlInsertUserRoom, [user_room_id2, user_id2, room_id2], function (err, result){
                if (err){
                  return console.log('error inserting user_room', err);
                }
              })

// exports.seed = function(knex, Promise) {
//   return knex('user_room').truncate()
//     .then(function() {
//       return knex('user_room').insert([
//         {
//           user_id: 1,
//           room_id: 1
//         },
//         {
//           user_id: 2,
//           room_id: 1
//         }
//       ])
//     })
//     .catch(function(error) {
//       console.error('error seeding rooms', error)
//     })
// };

