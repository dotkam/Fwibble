const db = require('../db/db_setup');

const Room = module.exports;

/*
  create new game room
  attrs: room_hash? TBD
*/

Room.create = function(attrs) {
  return db('rooms').insert(attrs, ['room_id', 'room_hash'])
    .catch(function(err) {
      if err console.log('error inserting Room into db', err)
    })
    .then(function(res){
      console.log('successfully inserted room')
    })
}

/* 
  Find all games user is a part of
  ??need to find active rooms only?  or do we purge old games
*/
Room.allUser = function(userId) {
  return db.select('room_id').from('user_room').where({'user_id': userId})
    .catch(function(err) {
      if err console.log('error retreiving rooms from db', err)
    })
    .then(function(res){
      console.log('successfully retrieved rooms')
    })
}

/*
  List all active rooms
  ?? flag for full or searching for more
*/

Room.allById = function() {
  return db.select('*').from('rooms')
    .catch(function(err) {
      if err console.log('error retreiving rooms from db', err)
    })
    .then(function(res){
      console.log('successfully retrieved rooms')
    })	
}

/*
  Not implemented, placeholder for possible future implementation
  List all rooms searching for players
*/

// Room.allSearching = function() {

// }
