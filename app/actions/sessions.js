var pg = require('../../db/db_setup');
var sha1 = require('sha1');

var Session = module.exports;

/*
  Generate token for entry into db using the timestamp
*/

Session.generateToken = function(sessionId, timestamp) {
  var token = sha1(timestamp);
  console.log(token);
  return pg('sessions').where({'session_id': sessionId}).update({'token': token}).returning(['session_id', 'user_id', 'createdat', 'token'])
    .catch(function(error) {
      console.error('error inserting token into db', error)
    }) 
    .then(function(res){
      console.log('successfully updated token', res)
      return res;
    })  
}

/*
  Find createdat value for token creation with sessionId
*/

Session.findTimestamp = function(sessionId) {
  return pg.select('createdat').from('sessions').where({'session_id': sessionId})
    .catch(function(error) {
      console.error('error retrieving timestamp', error)
    })
    .then(function(res){
      console.log('successfully retrieved timestamp', res)
      return res;
    })
}

/* 
  find session token via existing user id
*/

Session.findTokenByUserId = function(userId) {
  return pg.select('token').from('sessions').where({'user_id': userId})
    .catch(function(error) {
      console.error('error retrieving token', error)
    })
    .then(function(res){
      console.log('successfully retrieved token', res)
      return res;
    })
}

/*
  find session id using the existing user id
*/

Session.findIdByUserId = function(userId) {
  return pg.select('session_id').from('sessions').where({'user_id': userId})
    .catch(function(error) {
      console.error('error retrieving game', error)
    })
    .then(function(res){
      console.log('successfully retrieved game', res)
      return res;
    })
}

/* 
  attrs: 
    user_id 
*/

Session.create = function(attrs) {
  return pg('sessions').insert(attrs, ['session_id', 'user_id', 'createdat', 'token'])
    .catch(function(error) {
      console.error('error inserting session', error)
    })
    .then(function(res){
      console.log('successfully inserted session', res)
      var sessionId = res[0].session_id;
      var timestamp = res[0].createdat;
      console.log("sessionid", sessionId);
      Session.generateToken(sessionId, timestamp);
      return res;
    })
}

Session.delete = function(sessionId) {
  return db('sessions').where({'session_id': sessionId}).del()
    .catch(reportError('error deleting session'))
}

