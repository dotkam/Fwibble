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
  User.findIdByUsername(req.body.username)
  .then(function(array) {
    if(array.length) {
      return User.findActiveGame(array[0].user_id)
    } else {

    }
  })
  .then(function(array) {
    console.log("GameHash", array)
    return Game.findIdByHash(array[0].active_game)
  })
  .then(function(array) {
    // res.send("active room: " + array[0].active_room)
    console.log("GameID: ",array[0].game_id)
    // res.send("GameID: " + array[0].game_id)
    res.send(req.body.username)
  })
  .catch(function(err) {
    res.send("could not login user: " + err)
  })
}