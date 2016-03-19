var UserAPI = require('express').Router();

var User = require('../../app/actions/users');
var Game = require('../../app/actions/games');
var Session = require('../../app/actions/sessions')


module.exports = UserAPI;

UserAPI.post('/signin', function(req, res) {
	console.log("signin request: ", req.body)
  signIn(req, res)
})

UserAPI.post('/signup', function(req, res) {
	console.log("signup request: ", req.body)
  var errMsg = "Please try again later."

  User.findIdByUsername(req.body.username)
  .then(function(response) {
    // response is false if user is unknown
    if (response) {
      errMsg = "The username " + req.body.username + " is taken. Please try again."
      console.log('ERROR MESSAGE: ',errMsg)
      throw err
    } else {
      return User.create([{
        username: req.body.username,
        password: req.body.password,
        active_game: ''
      }])      
    }
  })
 .then(function(response) {
    console.log('User.create: ', response)
    setTimeout(function(){ 
       signIn(req, res)
     }, 1000);
 })
 .catch(function() {
  res.send({error: errMsg})
 })
})


function signIn (req, res, err) {
  var username = req.body.username;
  var password = req.body.password;
  var response = {
    userStatus: false,
    passStatus: false,
    activeUser: null,
    activeGame: null,
    errMessage: null,
    sessToken: null
  }, uid; // can we remove this a la line 47?

  User.findIdByUsername(username)
  // catch unknown username
  .then(function(userId) {
    console.log('user-api userId', userId)
    if (userId) {
      response.userStatus = true;
      response.activeUser = username;
      uid = userId // is this necessary?
    } else {
      response.errMessage = '' + username + ' not found. Please create an account.'
      throw err
    }
    return
  })
  // if username is valid, ask model if password is good
  .then(function() {
    return User.checkPassword(username, password)
  })
  // if password is incorrect, respond and throw error
  .then(function(bool) {
    console.log('bool', bool)
    if (!bool) {
      response.errMessage = 'Password incorrect. Please try again.'
      console.log('password incorrect: ',response.errMessage)
      throw err
    // otherwise, find active game
    } else {
      response.passStatus = true;
      response.activeUser = username;
      // return User.findActiveGame(username)
      newSession = {
        username: username
      }
      return Session.create(newSession)
    }
  })
  //after user has authenticated, create session for user in db
  .then(function() {
    setTimeout(function(){ 
      Session.userInnerJoin(username)
       .then(function(join) {
         response.activeGame = join.active_game || null;
         response.sessToken = join.token;
         console.log('RESPONSE', response)
         res.send(response);
       })
     }, 1000);
  })
  .catch(function(err) {
    console.error('response.err', response.errMessage)
    res.send(response)
  })
}
