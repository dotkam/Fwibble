var pg = require('../../db/db_setup');

var Text = module.exports;

/* Insert new sentence segment into database
  attrs: 
    text_content: six words from submit form
    room_id: which game room or instance text was entered into
    user_id: which user entered sentence
*/

Text.create = function(attrs) {
  return pg('texts').insert(attrs, ['text_id', 'text_content', 'room_id', 'user_id', 'createdat'])
    .catch(function(error) {
      console.error('error inserting text', error)
    })
    .then(function(res){
      console.log('successfully inserted text', res)
      return res;
    })
}

/*
  Retrieve all text related to the game room.
*/

Text.allOfRoom = function(roomId) {
  return pg.select('*').from('texts').where({'room_id': roomId})//.orderBy('createdAt', 'asc')
    .catch(function(error) {
      console.error('error retrieving text', error)
    })
    .then(function(res){
      console.log('successfully retrieved text', res)
      return res;
    })
}

/*
  Retrieve all text related to a particular user inside the game room.
*/

Text.allOfUser = function(roomId, userId) {
  return pg.select('*').from('texts').where({'room_id': roomId, 'user_id': userId})
  // return pg.select('*').from('texts').where({'room_id': roomId}).and({'user_id': userId})
    .catch(function(error) {
      console.error('error retrieving text', error)
    })
    .then(function(res){
      console.log('successfully retrieved text', res)
      return res;
    })
}
