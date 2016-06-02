var FwibAPI    = require('express').Router();

var Fwib = require('../models/fwibModel');
var User = require('../models/userModel');
var Game = require('../models/gameModel');

module.exports = FwibAPI;

/*
  POST game/:id_game/text

  Creates a new fwib for this game

  Expects request: {
    fwib_content: six words from submit form
    game_hash:    which game room or instance text was entered into
    username:     which user entered sentence
  }

  Responds with the new message: {
    fwib_id:       Number <unique id for this fwib>
    fwib_content:  The six word fragment 
    game_hash:       Game number it was entered in
    username:       Which user entered the text
    createdat:     timestamp, to help sort story flow
  }
*/

FwibAPI.post('/:game_hash/fwib', function(req, res) {

  console.log("This is request: ", req.body);
	
  var newFwib = {
		fwib_content: req.body.fwib_content,
		game_hash: req.params.game_hash,
		username: req.body.username
	}
  console.log("New Fwib", newFwib);
	console.log('FwibAPI.post req.body ', req.body.fwib_content, req.body.username, req.params.game_hash);

	Fwib.create(newFwib)
	  .then(function(data) { 
	  	res.status(201).send(data);
	  })
	  .catch(function(error) {
	  	console.error('ERROR POSTING:', req.url);
	  	res.status(500).send('Server error posting new fwib to game');
	  })
})

/*
  GET game/:id_game/

  Returns an array of fwibs for the given game

  Responds with: [
    {
    fwib_id:       Number <unique id for this text>
    fwib_content:  The six word fragment 
    game_ihash:       Game number it was entered in
    username:       Which user entered the text
    createdAt:     timestamp, to help sort story flow
    },
    ...
  ]
*/

FwibAPI.get('/:game_hash/', function(req, res) {
  var gamehash = req.params.game_hash;

  Fwib.allOfGame(gamehash)
	 .then(function(data) { 
	  	res.status(200).send(data);
	  })
    .catch(function(error) {
      console.error('ERROR GET:', request.url);
      res.status(500).send('Server error getting fwibs by game hash');
    })
})

