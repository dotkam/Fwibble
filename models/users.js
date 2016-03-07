var pg = require('../db/db_setup');

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