var UserAPI = require('express').Router();

var User = require('../../app/actions/users');

module.exports = UserAPI;

UserAPI.post('/signin', function(req, res) {

	console.log("signin request: ", req.body)
	// var activeRoom = '32a3f4';

	User.findIdByUsername(req.body.username)
		.then(function(array) {
			if(array.length) {
				return User.findActiveRoom(array[0].user_id)
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
