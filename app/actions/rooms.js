var pg = require('../db/db_setup');

var Room = module.exports;

/*
  create new game room
  attrs: room_hash? TBD
*/

Room.create = function(attrs) {
  return pg('rooms').insert(attrs, ['room_id', 'room_hash'])
    .catch(function(error) {
      console.error('error inserting room into db', error)
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
  return pg.select('room_id').from('user_room').where({'user_id': userId})
    .catch(function(error) {
      console.error('error retrieving rooms', error)
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
  return pg.select('*').from('rooms')
    .catch(function(error) {
      console.error('error retrieving rooms', error)
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
