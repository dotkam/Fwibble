const db = require('../db/db_setup');

const Text = module.exports;

/* Insert new sentence segment into database
  attrs: 
    text_content: six words from submit form
    room_id: which game room or instance text was entered into
    user_id: which user entered sentence
*/

Text.create = function(attrs) {
  return db('texts').insert(attrs, ['text_id', 'text_content', 'room_id', 'user_id', 'createdAt'])
    .catch(function(err) {
      if err console.log('error inserting text into db', err)
    })
    .then(function(res){
      console.log('successfully inserted text')
    })
}

/*
  Retrieve all text related to the game room.
*/

Text.allOfRoom = function(roomId) {
  return db.select('*').from('texts').where({'room_id': roomId})//.orderBy('createdAt', 'asc')
    .catch(function(err) {
      if err console.log('error retreiving text from db', err)
    })
    .then(function(res){
      console.log('successfully retrieved text')
    })
}

/*
  Retrieve all text related to a particular user inside the game room.
*/

Text.allOfUser = function(roomId, userId) {
  // return db.select('*').from('texts').where({'room_id': roomId, 'user_id: userId'})
  return db.select('*').from('texts').where({'room_id': roomId}).and({'user_id': userId})
    .catch(function(err) {
      if err console.log('error retreiving text from db', err)
    })
    .then(function(res){
      console.log('successfully retrieved text')
    })
}
