var pg = require('../../db/db_setup');
var sha1 = require('sha1');

var Session = module.exports;

/*
  Generate token for entry into db using the timestamp
*/

Session.generateToken = function(sessionId, timestamp) {
  var token = sha1(timestamp);
  console.log(token);
  return pg('sessions').where({'session_id': sessionId}).update({'token': token}).returning(['session_id', 'username', 'createdat', 'token'])
    .then(function(res){
      console.log('successfully updated token', res)
      return res[0];
    })  
    .catch(function(error) {
      console.error('error inserting token into db', error)
    }) 
}

/* 
  find session token via existing user id
*/

Session.findTokenByUsername = function(username) {
  return pg.select('token').from('sessions').where({'username': username})
    .then(function(res){
      console.log('successfully retrieved token', res)
      return res[0].token;
    })
    .catch(function(error) {
      console.error('error retrieving token', error)
    })
}

/*
  find session id using the existing username
*/

Session.findIdByUsername = function(username) {
  return pg.select('session_id').from('sessions').where({'username': username})
    .then(function(res){
      console.log('successfully retrieved session', res)
      return res[0].session_id;
    })
    .catch(function(error) {
      console.error('error retrieving session', error)
    })
}

/*
  find session id using the existing username
*/

Session.findByToken = function(token) {
  return pg.select('*').from('sessions').where({'token': token})
    .then(function(res){
      console.log('successfully retrieved user', res)
      return res[0].username;
    })
    .catch(function(error) {
      console.error('error retrieving user', error)
    })
}

/*
  inner join for session and users via username
*/

Session.userInnerJoin = function(username) {
  return pg('sessions').join('users', 'users.username', 'sessions.username').where('sessions.username', '=', username).select('sessions.token', 'users.active_game')
    .then(function(res){
      // console.log('successfully retrieved join table', res)
      return res[0];
    })
    .catch(function(error) {
      console.error('error retrieving join table', error)
    })
}

/*
  inner join for session and users via token lookup
*/

Session.tokenInnerJoin = function(token) {
  return pg('sessions').join('users', 'users.username', 'sessions.username').where('sessions.token', '=', token).select('sessions.username', 'users.active_game')
    .then(function(res){
      console.log('successfully retrieved join table', res)
      return res[0];
    })
    .catch(function(error) {
      console.error('error retrieving join table', error)
    })
}

/* 
  attrs: 
    username: username
*/

Session.create = function(attrs) {
  return pg('sessions').insert(attrs, ['session_id', 'username', 'createdat', 'token'])
    .then(function(res){
      console.log('successfully inserted session', res)
      var sessionId = res[0].session_id;
      var timestamp = res[0].createdat;

      return Promise.all([res, Session.generateToken(sessionId, timestamp)]) // Just return new Promise ?
    })
    .then(function(res) {
       console.log("create session after token creation", res);     
       return res[1][0]; // returning 'null' as string instead of object
    })
    .catch(function(error) {
      console.error('error inserting session', error) // Error Cannot read property '0' of undefined
    })
}

/* 
  Delete user's session via username
*/

Session.deleteByUsername = function(username) {
  return pg('sessions').where({'username': username}).del()
    .then(function(res) {
      console.log('successfully deleted session row', res)
      return res;
    })
    .catch(function(error) {
      console.error('error deleting session');
    })
}


