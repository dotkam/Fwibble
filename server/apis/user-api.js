var UserAPI = require('express').Router();

var User = require('../../app/actions/users');
var Game = require('../../app/actions/games');

module.exports = UserAPI;

UserAPI.post('/signin', function(req, res) {

	console.log("signin request: ", req.body)
	// var activeRoom = '32a3f4';

	User.findIdByUsername(req.body.username)
		.then(function(array) {
			if(array.length) {
				return User.findActiveGame(array[0].user_id)
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
			console.log("GameHash", array)
			return Game.findIdByHash(array[0].active_game)
		})
		.then(function(array) {
			// res.send("active room: " + array[0].active_room)
			console.log("GameID: ",array[0].game_id)
			res.redirect('/game/' + array[0].game_id)
		})
		.catch(function(err) {
			res.send("could not login user: " + err)
		})

})
