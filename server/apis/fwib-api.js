var FwibAPI    = require('express').Router();

var Fwib = require('../../app/actions/fwibs');
var User = require('../../app/actions/users');
var Game = require('../../app/actions/games');

module.exports = FwibAPI;

/*
  POST game/:id_game/text

  Creates a new fwib for this game

  Expects request: {
    fwib_content: six words from submit form
    game_id:      which game room or instance text was entered into
    user_id:      which user entered sentence
  }

  Responds with the new message: {
    fwib_id:       Number <unique id for this fwib>
    fwib_content:  The six word fragment 
    game_id:       Game number it was entered in
    user_id:       Which user entered the text
    createdat:     timestamp, to help sort story flow
  }
*/

FwibAPI.post('/:game_id/fwib', function(req, res) {

  console.log("This is request: ", req.body);
	
  var newFwib = {
		fwib_content: req.body.text_content,
		game_id: req.params.game_id,
		user_id: req.body.user_id
	}

	console.log('FwibAPI.post req.body ', req.body);

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
    game_id:       Game number it was entered in
    user_id:       Which user entered the text
    createdAt:     timestamp, to help sort story flow
    },
    ...
  ]
*/

//using room_id for now, can be changed to room_hash later, then run Room.findByHash to find the roomid to enter as argument
FwibAPI.get('/:game_id/', function(req, res) {
  var gameId = req.params.game_id;

  Fwib.allOfGame(gameId)
	 .then(function(data) { 
	  	res.status(200).send(data);
	  })
    .catch(function(error) {
      console.error('ERROR GET:', request.url);
      res.status(500).send('Server error getting fwibs by game id');
    })
})

