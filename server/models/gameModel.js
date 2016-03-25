var pg = require('../../db/db_setup');
var sha1 = require('sha1');

var Game = module.exports;

/*
  Creates random sha1 hash to enter into game_hash field
  gameId: game_id created by db insertion
*/

Game.generateHash = function(gameId) {
  var hash = sha1(gameId);
  hash = hash.slice(0, 15);
  console.log(hash)
  return pg('games').where({'game_id': gameId}).update({'game_hash': hash}).returning(['game_id', 'game_hash', 'game_title', 'turn_index', 'game_status', 'game_creator'])

    .catch(function(error) {
      console.error('error inserting hash into db', error)
    }) 
    .then(function(res){
      console.log('successfully updated hash', res)
      return res;
    })  
}
/*
  fwibble title creator

  when the function runs, first run a random number to determine the starter sentence
  then when the starter sentence is chosen, the random generator in each will run and populate the words
  then will start a fwib in db 

*/

Game.titleGenerator = function() {
  var noun = ['Cat', 'Dog', 'Elephant', 'Child', 'Dragon', 'Witch', 'King', 'Queen', 'Flower', 'Bird', 'Kobold', 'Gnome', 'Elf', 'Wizard', 'Chess Master', 'Actor', 'Teacher', 'Artist', 'Bus Driver', 'Golfer', 'Sentient Trashcan', 'Dungeons and Dragons Enthusiast'];
  var ptverb = ['Ran', 'Climbed', 'Looked', 'Jumped', 'Flew', 'Dug', 'Fell', 'Shouted', 'Gave', 'Rang', 'Wrote', 'Babysat', 'Sat', 'Napped', 'Skipped', 'Cartwheeled', 'Documented', 'Prepared', 'Fought', 'Taught', 'Hired', 'Annoyed', 'Raced', 'Convinced', 'Cold Called', 'Drove'];
  var preposition = ['Into', 'Around', 'Into and Around', 'In', 'After', 'Out of', 'Beyond', 'Down', 'From', 'Through', 'Up', 'Over', 'Onto', 'By', 'Across', 'Amid', 'Beside', 'Between', 'Inside', 'Outside'];
  var adjective = ['Purple', 'Large', 'Tiny', 'Yellow', 'Magnificent', 'Calm', 'Jolly', 'Talented', 'Witty', 'Generous', 'Dirty, Dirty', 'Prepubescent', 'Evil', 'Lovable', 'Sad', 'Crazy', 'Silly'];
  var properNoun = ['Mr. Belvedere', 'President Obama', 'Jiggypuff', 'Spiderman', 'Captain Kirk', 'Aragorn', 'Oprah', 'Magneto', 'Big Bird', 'Kanye West', 'Vladimir Putin', 'Guy Fieri', 'Simon Cowell', 'David Bowie', 'Gloria Steinem', 'The Artist Formerly Known as and Who Currently Goes by Prince', 'Hulk Hogan', 'The Entire Cast of Cheers', 'Joe Biden', 'The Velveteen Rabbit', 'Tito Puente', 'George Washington', 'Sasquatch', 'Jay Leno', 'Aladdin'];
  var pluralNoun = ['Cats', 'Dogs', 'Elephants', 'Children', 'Dragons', 'Witches', 'Kings', 'Queens', 'Flowers', 'Birds', 'Kobolds', 'Gnomes', 'Elves', 'Wizards', 'Chess Masters', 'Actors', 'Teachers', 'Artists', 'Bus Drivers', 'Golfers', 'Sentient Trashcans', 'Dungeons and Dragons Enthusiasts'];

  var randomer = function(array) {
    return array[Math.floor(Math.random() * array.length)];
  } 
  var fwib = ['The ' + randomer(noun) + ' ' + randomer(ptverb) + ' ' + randomer(preposition) + ' the ' + randomer(noun), randomer(properNoun) + ' and the ' + randomer(adjective) + ' ' + randomer(pluralNoun), "Episode II: Attack of the " + randomer(pluralNoun), randomer(properNoun) + "\'s " + randomer(pluralNoun), "Star Trek III: The Search for " + randomer(properNoun), "Harry Potter and the " + randomer(noun) + " of the " + randomer(noun)];

  var starter = randomer(fwib);
  console.log(starter);

  return starter;
}

/*
  create new game
  attrs: 
    game_title: Fwib.starterFwib
    game_creator: username
*/

Game.create = function(attrs) {
  attrs.game_title = Game.titleGenerator();
  return pg('games').insert(attrs, ['game_id', 'game_hash', 'game_title', 'turn_index', 'game_status', 'game_creator'])
    .then(function(res){
      console.log('successfully inserted game', res)
      var gameId = res[0].game_id;
      console.log("game id", gameId);
      return Game.generateHash(gameId)
        .then(function(res2){
          return res2[0];
        })
    })
    .catch(function(error) {
      console.error('error inserting game into db', error)
    })
}

Game.titleByHash = function(gamehash) {
  return pg.select('game_title').from('games').where({'game_hash': gamehash})
    .catch(function(error) {
      console.error('error retrieving game', error)
    })
    .then(function(res){
      console.log('successfully retrieved game', res)
      return res[0].game_title;
    })  
}


/* 
  Find all users in a game (where game is in progress)
*/
Game.allUser = function(gamehash) {
  return pg.select('username').from('users').where({'active_game': gamehash})
    .catch(function(error) {
      console.error('error retrieving users', error)
    })
    .then(function(res){
      // console.log('successfully retrieved users', res)
      return res;
    })
}

/*

  List all active game
  where status equals joinable: open and accepting players
                      in progress: active but closed to new players
                      completed: not active game has ended

*/

Game.allJoinable = function() {
  return pg.select('*').from('games').where({'game_status': 'open'})
    .catch(function(error) {
      console.error('error retrieving games', error)
    })
    .then(function(res){
      console.log('successfully retrieved ' + res.length + ' games')
      return res;
    }) 
}

Game.allInProgress = function() {
  return pg.select('*').from('games').where({'game_status': 'in progress'})
    .catch(function(error) {
      console.error('error retrieving games', error)
    })
    .then(function(res){
      console.log('successfully retrieved games', res)
      return res;
    })  
}

Game.allCompleted = function() {
  return pg.select('*').from('games').where({'game_status': 'completed'})
    .catch(function(error) {
      console.error('error retrieving games', error)
    })
    .then(function(res){
      console.log('successfully retrieved games', res)
      return res;
    })  
}

Game.all = function() {
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
  Update the game status to change how rooms are viewable and accept players
  Gamehash: game_hash
  Status: Must be 'open', 'in progress', 'completed'

*/

Game.updateToOpen = function(gamehash) {
  return pg('games').where({'game_hash': gamehash}).update({'game_status': 'open'})
    .catch(function(error) {
      console.error('error updating status', error)
    })
    .then(function(res){
      console.log('successfully updated status', res)
      return res;
    })
}

Game.updateToInProgress = function(gamehash) {
  return pg('games').where({'game_hash': gamehash}).update({'game_status': 'in progress'})
    .catch(function(error) {
      console.error('error updating status', error)
    })
    .then(function(res){
      console.log('successfully updated status', res)
      return res;
    })
}

Game.updateToCompleted = function(gamehash) {
  return pg('games').where({'game_hash': gamehash}).update({'game_status': 'completed'})
    .catch(function(error) {
      console.error('error updating status', error)
    })
    .then(function(res){
      console.log('successfully updated status', res)
      return res;
    })
}

/*
  Primary keys are arbitrarily assigned by PostgreSQL, this method gives us a way to find the ID based on username
  **depreciated**
*/

Game.findIdByHash = function(hash) {
  return pg.select('game_id').from('games').where({'game_hash': hash})
    .catch(function(error) {
      console.error('error retrieving game', error)
    })
    .then(function(res){
      console.log('successfully retrieved game', res)
      return res[0].game_id;
    })
}

/*
  Finds the active turn of game by game id
*/
Game.findTurn = function(gamehash) {
  return pg.select('turn_index').from('games').where({'game_hash': gamehash})
    .catch(function(error) {
      console.error('error retrieving turn', error)
    })
    .then(function(res){
      console.log('successfully retrieved turn', res)
      return res[0].turn_index;
    })
}

/*
  Update the turn value inside the game to appropriately identify the active turn
  Gamehash: game_hash
  newTurn: new value of turn to update in column
*/

Game.updateTurn = function(gamehash, newTurn) {
  return pg('games').where({'game_hash': gamehash}).update({'turn_index': newTurn})
    .catch(function(error) {
      console.error('error updating turn', error)
    })
    .then(function(res){
      console.log('successfully updated turn', res)
      return res;
    })
}




