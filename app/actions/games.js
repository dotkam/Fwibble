var pg = require('../../db/db_setup');

var Game = module.exports;

/*
  create new game
  attrs: 
    room_hash? TBD
    room_title: TBD

*/

Game.create = function(attrs) {
  return pg('games').insert(attrs, ['game_id', 'game_hash', 'game_title'])
    .catch(function(error) {
      console.error('error inserting game into db', error)
    })
    .then(function(res){
      console.log('successfully inserted game', res)
      return res;
    })
}

/* 
  Find all users in a game
  ??need to find active rooms only?  or do we purge old games
*/
Game.allUser = function(gameId) {
  return pg.select('user_id').from('user_game').where({'game_id': gameId})
    .catch(function(error) {
      console.error('error retrieving users', error)
    })
    .then(function(res){
      console.log('successfully retrieved users', res)
      return res;
    })
}


/*
  List all active game
  ?? flag for full or searching for more
*/

Game.allById = function() {
  return pg.select('*').from('games')
    .catch(function(error) {
      console.error('error retrieving games', error)
    })
    .then(function(res){
      console.log('successfully retrieved games', res)
      return res;
    })	
}

/*
  Primary keys are arbitrarily assigned by PostgreSQL, this method gives us a way to find the ID based on username
*/

Game.findIdByHash = function(hash) {
  return pg.select('game_id').from('games').where({'game_hash': hash})
    .catch(function(error) {
      console.error('error retrieving game', error)
    })
    .then(function(res){
      console.log('successfully retrieved game', res)
      return res;
    })
}
/*
  Not implemented, placeholder for possible future implementation
  List all rooms searching for players
*/

// Room.allSearching = function() {

// }
