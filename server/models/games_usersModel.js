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
  return pg('games AS g').join('games_users AS gu', 'g.game_hash', 'gu.game_hash').where({'user_id': userId}).orderBy('game_id')
}

GamesUsers.removeUsernameFromGame = function(attrs){
  var game_hash = attrs.game_hash
  return pg.select('user_id').from('users').where({username: attrs.username})
    .then(function(res){
      console.log('deleting res:', res)
      console.log('game_hash:', game_hash)
      return pg('games_users').where({'user_id': res[0].user_id, 'game_hash': game_hash}).del();
    });
}

GamesUsers.addGameToFavorites = function(attrs){
  // TODO: find user_id by username
  //       set favorite to true
  var game_hash = attrs.game_hash;
  return pg.select('user_id').from('users').where({username: attrs.username})
    .then(function(res){
      console.log('FAVORITING res:', res)
      return pg('games_users').where({'user_id': res[0].user_id, 'game_hash': game_hash}).update({'favorite': attrs.favorite});
    })
}

GamesUsers.removeGameFromFavorites = function(attrs){
  // TODO: find user_id by username
  //       set favorite to true
  var game_hash = attrs.game_hash;
  return pg.select('user_id').from('users').where({username: attrs.username})
    .then(function(res){
      console.log('UNFAVORITING res:', res)
      return pg('games_users').where({'user_id': res[0].user_id, 'game_hash': game_hash}).update({'favorite': false});
    })
}