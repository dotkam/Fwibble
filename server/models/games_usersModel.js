var pg = require('../../db/db_setup');

var GamesUsers = module.exports;

/*
  Insert a new relationship between user and game
  attrs:
    user_id
    game_hash

*/

GamesUsers.addUsernameToGame = function(attrs){
  var game_hash = attrs.game_hash
  return pg.select('user_id').from('users').where({username: attrs.username})
    .then(function(res){
      var attrs = { user_id: res[0].user_id, game_hash: game_hash }
      return pg('games_users').insert(attrs, ['user_id', 'game_hash'])
    });
}

GamesUsers.allGamesByUserId = function(userId){
  return pg('games').join('games_users', 'games.game_hash', 'games_users.game_hash').where({'user_id': userId}).orderBy('game_id')
}