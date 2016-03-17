var UserAPI = require('express').Router();

var User = require('../../app/actions/users');
var Game = require('../../app/actions/games');

module.exports = UserAPI;

UserAPI.post('/signin', function(req, res) {
	console.log("signin request: ", req.body)
  signIn(req, res)
})

UserAPI.post('/signup', function(req, res) {
	console.log("signup request: ", req.body)

	User.create([{
    username: req.body.username,
    password: req.body.password,
    active_game: '458d21'
  }])
	 .then(function(array) {
    console.log('User.create: ', array)
   })
   .then(function() {
    signIn(req, res)
   })
})


function signIn (req, res, err) {

  var response = {
    userStatus: false,
    passStatus: false,
    activeUser: null,
    activeGame: null,
    errMessage: null
  }, uid; // can we remove this a la line 47?

  User.findIdByUsername(req.body.username)
  // catch unknown username
  .then(function(userId) {
    console.log('user-api userId', userId)
    if (userId) {
      response.userStatus = true;
      response.activeUser = req.body.username;
      uid = userId // is this necessary?
    } else {
      response.errMessage = '' + req.body.username + ' not found. Please create an account.'
      throw err
    }
    return
  })
  // if username is valid, ask model if password is good
  .then(function() {
    return User.checkPassword(req.body.username, req.body.password)
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
      response.activeUser = req.body.username;
      return User.findActiveGame(uid)
    }
  })
  // translate GameHash to GameId
  .then(function(array) {
    return Game.findIdByHash(array[0].active_game)
  })
  // and send relevant response
  .then(function(array) {
    response.activeGame = array[0].game_id;

    res.send(response)
  })
  // catch-all for thrown errors
  .catch(function(err) {
    console.error('response.err', response.errMessage)
    res.send(response)
  })
}