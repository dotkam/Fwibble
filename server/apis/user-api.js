var UserAPI = require('express').Router();

var Text = require('../../app/actions/texts');
var User = require('../../app/actions/users');
var Room = require('../../app/actions/rooms');

module.exports = UserAPI;

/*
  POST /signin

  signs user in

  Expects request: {
    username: unique username
    password: TBD
  }

  Responds with the user information: {
    user_id:       Number <unique id for this user>
  }

  User ID is then fed into User.findActiveRoom with user_id

  If fails, redirect to /signup
*/
UserAPI.post('/signin', function(req, res) {

	console.log("signin request: ", req.body)
	// var activeRoom = '32a3f4';

	var username = req.body.username;

	User.findIdByUsername(username)
		.then(function(user) {
			if(array.length) {
				return User.findActiveRoom(user[0].user_id)
			} else {
				// console.log("ELSE ",req.body.username)
				// User.create(req.body.username, req.body.password)
				// 	.then(function(succ) {
				// 		console.log("Success!", succ)
				// 	})
				// 	.catch(function(err) {
				// 		console.log("couldn't add user because: ", err)
				// 	})
			}
		})
		.then(function(array) {
			res.send("active room: " + array[0].active_room)
		})
		.catch(function(err) {
			res.send("could not login user: " + err)
		})

})

UserAPI.post('/signup', function(req, res) {
