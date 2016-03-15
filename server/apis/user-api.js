var UserAPI = require('express').Router();

var User = require('../../app/actions/users');
var Game = require('../../app/actions/games');

module.exports = UserAPI;

UserAPI.post('/signin', function(req, res) {

	console.log("signin request: ", req.body)
	// var activeRoom = '32a3f4';	

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


function signIn (req, res) {
  var response = {
    userStatus: false,
    passStatus: false,
    activeUser: null,
    activeGame: null,
    errMessage: null
  };
  User.findIdByUsername(req.body.username)
  // catch unknown username
  .then(function(array) {
    if (array.length>0) {
      response.userStatus = true;
      response.activeUser = req.body.username;
    } else {
      response.errMessage = 'Username not found. Please create an account.'
    throw error
    }
  })
  // ask model if password is good
  .then(function(array) {
    response.userStatus = true;
    return User.checkPassword(array[0].user_id, req.body.password)
  })
  // if password is incorrect, respond and throw error
  .then(function(bool) {
    if (!bool) {
      response.errMessage = 'Password incorrect. Please try again.'
      throw error
    } else {
      response.passStatus = true;
      response.activeUser = req.body.username;
    }
    console.log("Password response", array)
  })
  // otherwise, find active game
  .then(function(array) {
    if(array.length) {
      return User.findActiveGame(array[0].user_id)
    }
  })
  // translate to gamehash
  .then(function(array) {
    console.log("GameHash", array)
    return Game.findIdByHash(array[0].active_game)
  })
  // and send relevant response
  .then(function(array) {
    // res.send("active room: " + array[0].active_room)
    console.log("GameID: ",array[0].game_id)
    response.activeGame = array[0].game_id;
    // res.send("GameID: " + array[0].game_id)
    res.send(response)
  })
  // catch-all response
  .catch(function(err) {
    console.error('catch all error:', response.errMessage)
    res.send(response)
  })
}