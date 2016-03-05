const db = require('../db/db_setup');

const User = module.exports;

/* 
  Create new user
  Attrs: 
    username
    password
*/

User.create = function(attrs) {
  return db('users').insert(attrs, ['user_id', 'username', 'password', 'active_room'])
    .catch(function(err) {
      if err console.log('error inserting user into db', err)
    })
    .then(function(res){
      console.log('successfully inserted user')
    })
}

/*
  Locates and loads active room/last room played in for user
*/

User.findActiveRoom = function(userId) {
  return db.select('active_room').from('users').where({'user_id': userId});
    .catch(function(err) {
      if err console.log('error retreiving room from db', err)
    })
    .then(function(res){
      console.log('successfully retrieved room')
    })
}