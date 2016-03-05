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


var sqlInsertText = 'INSERT INTO "texts" (text_id, text_content, room_id, user_id) VALUES ($1, $2, $3, $4)';
var text_id = 1;
var text_id2 = 2;
var text_id3 = 3;
var text_id4 = 4;
var text_id5 = 5;
var user_id = 1;
var userid2 = 2;
var room_id = 1;
var text_content1 = "This little piggy went to the";
var text_content2 = "dentist. After a painful tooth pull";
var text_content3 = "the piggy had a bowl of";
var text_content4 = "pain killers. It really hurt. So";
var text_content5 = "he slept a lot. The End";

pgClient.query(sqlInsertText, [text_id, text_content1, room_id, user_id], function (err, result){
                if (err){
                  return console.log('error inserting user', err);
                }
              })

pgClient.query(sqlInsertText, [text_id2, text_content2, room_id, userid2], function (err, result){
                if (err){
                  return console.log('error inserting user', err);
                }
              })

pgClient.query(sqlInsertText, [text_id3, text_content3, room_id, user_id], function (err, result){
                if (err){
                  return console.log('error inserting user', err);
                }
              })

pgClient.query(sqlInsertText, [text_id4, text_content4, room_id, userid2], function (err, result){
                if (err){
                  return console.log('error inserting user', err);
                }
              })

pgClient.query(sqlInsertText, [text_id5, text_content5, room_id, user_id], function (err, result){
                if (err){
                  return console.log('error inserting user', err);
                }
              })

// exports.seed = function(knex, Promise) {
//   return knex('text').truncate()
//     .then(function() {
//       return knex('text').insert([
//         {
//           text_content: "This is an example of a",
//           room_id: 1,
//           user_id: 1
//         },
//         {
//           text_content: "fwibble in action.  Three more words",
//           room_id: 1,
//           user_id: 2
//         }
//       ])
//     })
//     .catch(function(error) {
//       console.error('error seeding user_room', error)
//     })
// };

