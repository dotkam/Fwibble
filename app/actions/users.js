var pg = require('../../db/db_setup');

var User = module.exports;

/* 
  Create new user
  Attrs: 
    username
    password
*/

User.create = function(attrs) {
  return pg('users').insert(attrs, ['user_id', 'username', 'password', 'active_room'])
    .catch(function(error) {
      console.error('error inserting user', error)
    })
    .then(function(res){
      console.log('successfully inserted user')
    })
}

/*
  Locates and loads active room/last room played in for user
*/

User.findActiveRoom = function(userId) {
  return pg.select('active_room').from('users').where({'user_id': userId})
    .catch(function(error) {
      console.error('error retrieving room', error)
    })
    .then(function(res){
      console.log('successfully retrieved room')
    })
}

/*
  Adds user to existing game room
  attrs: 
    user_id: id of user
    room_id: id of room to join
*/

User.joinRoom = function(attrs) {
  return pg('user_room').insert(attrs, ['user_id', 'room_id'])
    .catch(function(error) {
      console.error('error inserting user into room', error)
    })
    .then(function(res){
      console.log('successfully inserted user into room')
    })
}

/* 
  Find all games user is a part of
  ??need to find active rooms only?  or do we purge old games
*/
User.allRoom = function(userId) {
  return pg.select('room_id').from('user_room').where({'user_id': userId})
    .catch(function(error) {
      console.error('error retrieving rooms', error)
    })
    .then(function(res){
      console.log('successfully retrieved rooms')
    })
}

