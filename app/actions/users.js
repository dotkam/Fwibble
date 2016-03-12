var pg = require('../../db/db_setup');

var User = module.exports;

/* 
  Create new user
  Attrs: 
    username
    password
*/

User.create = function(attrs) {
  return pg('users').insert(attrs, ['user_id', 'username', 'password', 'active_game'])
    .catch(function(error) {
      console.error('error inserting user', error)
    })
    .then(function(res){
      console.log('successfully inserted user', res)
      return res;
    })
}

/*
  Locates and loads active room/last room played in for user
*/

User.findActiveGame = function(userId) {
  return pg.select('active_game').from('users').where({'user_id': userId})
    .catch(function(error) {
      console.error('error retrieving game', error)
    })
    .then(function(res){
      console.log('successfully retrieved game', res)
      return res;
    })
}

/*
  Adds user to existing game room
  attrs: 
    user_id: id of user
    game_id: id of room to join
*/

User.joinGame = function(attrs) {
  return pg('user_game').insert(attrs, ['user_id', 'game_id'])
    .catch(function(error) {
      console.error('error inserting user into game', error)
    })
    .then(function(res){
      console.log('successfully inserted user into game', res)
      return res;
    })
}

/* 
  Find all games user is a part of
  ??need to find active rooms only?  or do we purge old games
*/
User.allGame = function(userId) {
  return pg.select('game_id').from('user_game').where({'user_id': userId})
    .catch(function(error) {
      console.error('error retrieving games', error)
    })
    .then(function(res){
      console.log('successfully retrieved games', res)
      return res;
    })
}

/*
  Primary keys are arbitrarily assigned by PostgreSQL, this method gives us a way to find the ID based on username
*/

User.findIdByUsername = function(username) {
  return pg.select('user_id').from('users').where({'username': username})
    .catch(function(error) {
      console.error('error retrieving user', error)
    })
    .then(function(res){
      console.log('successfully retrieved user', res)
      return res;
    })
}
