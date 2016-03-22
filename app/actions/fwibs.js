// var pg = require('../../db/db_setup');

// var Fwib = module.exports;

// /* Insert new sentence segment into database
//   attrs: 
//     fwib_content: six words from submit form
//     game_hash: which game room text was entered into
//     username: which user entered sentence
// */

// Fwib.create = function(attrs) {
//   return pg('fwibs').insert(attrs, ['fwib_id', 'fwib_content', 'game_hash', 'username', 'createdat'])

//     .catch(function(error) {
//       console.error('error inserting fwib', error)
//     })
//     .then(function(res){
//       console.log('successfully inserted fwib', res)
//       return res[0];
//     })
// }

// /*
//   Retrieve all fwibs related to the game.
// */

// Fwib.allOfGame = function(gamehash) {
//   return pg.select('*').from('fwibs').where({'game_hash': gamehash}).orderBy('createdat', 'asc')
//     .catch(function(error) {
//       console.error('error retrieving fwib', error)
//     })
//     .then(function(res){
//       console.log('successfully retrieved fwib', res)
//       return res;
//     })
// }

// /*
//   Retrieve all fwibs related to a particular user inside the game.
// */

// Fwib.allOfUser = function(gamehash, username) {
//   return pg.select('*').from('fwibs').where({'game_hash': gamehash, 'username': username})
//     .catch(function(error) {
//       console.error('error retrieving fwib', error)
//     })
//     .then(function(res){
//       console.log('successfully retrieved fwib', res)
//       return res;
//     })
// }

