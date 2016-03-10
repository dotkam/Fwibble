var TextAPI    = require('express').Router();

var Text = require('../../app/actions/texts');
var User = require('../../app/actions/users');
var Room = require('../../app/actions/rooms');

module.exports = TextAPI;

/*
  POST room/:id_room/text

  Creates a new text for this gameroom

  Expects request: {
    text_content: six words from submit form
    room_id:      which game room or instance text was entered into
    user_id:      which user entered sentence
  }

  Responds with the new message: {
    text_id:       Number <unique id for this text>
    text_content:  The six word fragment 
    room_id:       Room number it was entered in
    user_id:       Which user entered the text
    createdAt:     timestamp, to help sort story flow
  }
*/

TextAPI.post('/:room_id/text', function(request, response) {
	var newText = {
		text_content: request.body.text_content,
		room_id: request.body.room_id,
		user_id: request.body.user_id
	}

	console.log('TextAPI.post req.body ', request.body);

	Text.create(newText)
	  .then(function(data) { 
	  	response.status(201).send(data);
	  })
	  .catch(function(error) {
	  	console.error('ERROR POSTING:', request.url);
	  	response.status(500).send('Server error posting new text to room');
	  })
})

/*
  GET text/:id_room/

  Returns an array of texts for the given room

  Responds with: [
    {
    text_id:       Number <unique id for this text>
    text_content:  The six word fragment 
    room_id:       Room number it was entered in
    user_id:       Which user entered the text
    createdAt:     timestamp, to help sort story flow
    },
    ...
  ]
*/

//using room_id for now, can be changed to room_hash later, then run Room.findByHash to find the roomid to enter as argument
TextAPI.get('/:room_id/', function(request, response) {
  var roomId = request.params.room_id;

  Text.allOfRoom(roomId)
	 .then(function() { 
	  	response.status(200)
	  })
    .catch(function(error) {
      console.error('ERROR GET:', request.url);
      response.status(500).send('Server error getting texts by room id');
    })
})

