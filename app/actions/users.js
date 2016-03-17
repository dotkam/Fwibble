var pg = require('../../db/db_setup');
var bcrypt = require('bcryptjs');

var User = module.exports;

/*
  Creates password hash using bcrypt to enter into password field
  userId: user_id created by db insertion
*/

User.encryptPassword = function(username, password) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  console.log(hash)
  return pg('users').where({'username': username}).update({'password': hash}).returning(['user_id', 'username', 'password', 'active_game'])
    .catch(function(error) {
      console.error('error inserting hash into db', error)
    }) 
    .then(function(res){
      console.log('successfully updated hash', res)
      return res[0];
    })  
}

/*
  Primary keys are arbitrarily assigned by PostgreSQL, this method gives us a way to find the ID based on username
  **Depreciated**
*/

User.findIdByUsername = function(username) {
  return pg.select('user_id').from('users').where({'username': username})
    .catch(function(error) {
      console.error('error retrieving user', error)
    })
    .then(function(res){
      console.log('successfully retrieved user', res)
      if (res.length===0) {
        return false
      } else {
        return res[0].user_id;
      }
    })
}

/*
  Check entered password against saved hash
  userId:    find by using User.findIdByUsername
  password:  entered password
*/

User.checkPassword = function(username, password) {
  return pg.select('password').from('users').where({'username': username})
    .then(function(hashed){
      console.log('hashed', hashed)
      var validated = false;
      var hash = hashed[0].password;
      console.log('successfully retrieved hash', hash);
      var validated = bcrypt.compareSync(password, hash)

        if (validated === true) {
          console.log('password checks out!');
        } else {
          console.log('incorrect password, beat it bozo!');
        }
      return validated;
    })
    .catch(function(error) {
      console.error('error retrieving hash', error)
    })
}

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
      var username = res[0].username;
      var password = res[0].password;
      console.log("username", username);
      User.encryptPassword(username, password);
      return res[0];
    })
}

/*
  Locates and loads active room/last room played in for user
*/

User.findActiveGame = function(username) {
  return pg.select('active_game').from('users').where({'username': username})

    .catch(function(error) {
      console.error('error retrieving game', error)
    })
    .then(function(res){
      console.log('successfully retrieved game', res)
      return res[0].active_game;
    })
}

/*
  Adds user to existing game room
  attrs: 
    user_id: id of user
    game_id: id of room to join

    **Depreciated**
*/

User.joinGame = function(attrs) {
  return pg('user_game').insert(attrs, ['user_id', 'game_id'])
    .catch(function(error) {
      console.error('error inserting user into game', error)
    })
    .then(function(res){
      console.log('successfully inserted user into game', res)
      return res[0];
    })
}

/*
  Updates active_game field for user
  username: unique username
  gamehash: unique game_hash of game
*/

User.addActiveRoom = function(username, gamehash) {
  return pg('users').where({'username': username}).update({'active_game': gamehash}).returning(['user_id', 'username', 'password', 'active_game'])    
    .catch(function(error) {
      console.error('error inserting active game', error)
    })
    .then(function(res){
      console.log('successfully updated active game', res)
      return res;
    })
}

User.deleteActiveRoom = function(username) {
  return pg('users').where({'username': username}).update({'active_game': null}).returning(['user_id', 'username', 'password', 'active_game'])
    .catch(function(error) {
      console.error('error inserting active game', error)
    })
    .then(function(res){
      console.log('successfully updated active game', res)
      return res;
    })
}

/* 
  Find all games user is a part of
  ??need to find active rooms only?  or do we purge old games

  **Depreciated** Use User.findActiveGame
*/
// User.allGame = function(username) {
//   return pg.select('game_hash').from('user_game').where({'username': username})
//     .catch(function(error) {
//       console.error('error retrieving games', error)
//     })
//     .then(function(res){
//       console.log('successfully retrieved games', res)
//       return res[0].game_hash;
//     })
// }


