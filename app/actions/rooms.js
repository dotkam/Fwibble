var pg = require('../../db/db_setup');

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
      console.log('successfully inserted room', res)
      return res;
    })
}

/* 
  Find all users in a game room
  ??need to find active rooms only?  or do we purge old games
*/
Room.allUser = function(roomId) {
  return pg.select('user_id').from('user_room').where({'room_id': roomId})
    .catch(function(error) {
      console.error('error retrieving users', error)
    })
    .then(function(res){
      console.log('successfully retrieved users', res)
      return res;
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
      console.log('successfully retrieved rooms', res)
      return res;
    })	
}

/*
  Primary keys are arbitrarily assigned by PostgreSQL, this method gives us a way to find the ID based on username
*/

Room.findIdByHash = function(hash) {
  return pg.select('room_id').from('rooms').where({'hash': room_hash})
    .catch(function(error) {
      console.error('error retrieving room', error)
    })
    .then(function(res){
      console.log('successfully retrieved room', res)
      return res;
    })
}
/*
  Not implemented, placeholder for possible future implementation
  List all rooms searching for players
*/

// Room.allSearching = function() {

// }
