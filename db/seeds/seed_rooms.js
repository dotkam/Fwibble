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


var sqlInsertRoom = 'INSERT INTO "rooms" (room_id, room_hash) VALUES ($1, $2)';
var room_id = 1;
var room_hash = "32a3f4"


pgClient.query(sqlInsertRoom, [room_id, room_hash], function (err, result){
                if (err){
                  return console.log('error inserting user', err);
                }
              })

