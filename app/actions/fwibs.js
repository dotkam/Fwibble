var pg = require('../../db/db_setup');

var Fwib = module.exports;

/* Insert new sentence segment into database
  attrs: 
    fwib_content: six words from submit form
    game_id: which game room text was entered into
    user_id: which user entered sentence
*/

Fwib.create = function(attrs) {
  return pg('fwibs').insert(attrs, ['fwib_id', 'fwib_content', 'game_id', 'user_id', 'createdat'])
    .catch(function(error) {
      console.error('error inserting fwib', error)
    })
    .then(function(res){
      console.log('successfully inserted fwib', res)
      return res;
    })
}

/*
  Retrieve all fwibs related to the game.
*/

Fwib.allOfGame = function(gameId) {
  return pg.select('*').from('fwibs').where({'game_id': gameId}).orderBy('createdat', 'asc')
    .catch(function(error) {
      console.error('error retrieving fwib', error)
    })
    .then(function(res){
      console.log('successfully retrieved fwib', res)
      return res;
    })
}

/*
  Retrieve all fwibs related to a particular user inside the game.
*/

Fwib.allOfUser = function(gameId, userId) {
  return pg.select('*').from('fwibs').where({'game_id': gameId, 'user_id': userId})
    .catch(function(error) {
      console.error('error retrieving fwib', error)
    })
    .then(function(res){
      console.log('successfully retrieved fwib', res)
      return res;
    })
}
