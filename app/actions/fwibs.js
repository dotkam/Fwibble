var pg = require('../../db/db_setup');

var Fwib = module.exports;

/* Insert new sentence segment into database
  attrs: 
    fwib_content: six words from submit form
    game_hash: which game room text was entered into
    username: which user entered sentence
*/

Fwib.create = function(attrs) {
  return pg('fwibs').insert(attrs, ['fwib_id', 'fwib_content', 'game_hash', 'username', 'createdat'])
    .catch(function(error) {
      console.error('error inserting fwib', error)
    })
    .then(function(res){
      console.log('successfully inserted fwib', res)
      return res[0];
    })
}

/*
  Retrieve all fwibs related to the game.
*/

Fwib.allOfGame = function(gamehash) {
  return pg.select('*').from('fwibs').where({'game_hash': gamehash}).orderBy('createdat', 'asc')
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

Fwib.allOfUser = function(gamehash, username) {
  return pg.select('*').from('fwibs').where({'game_hash': gamehash, 'username': username})
    .catch(function(error) {
      console.error('error retrieving fwib', error)
    })
    .then(function(res){
      console.log('successfully retrieved fwib', res)
      return res;
    })
}

/*
  fwibble starter

  when the function runs, first run a random number to determine the starter sentence
  then when the starter sentence is chosen, the random generator in each will run and populate the words
  then will start a fwib in db 

  attrs: 
      fwib_content: random sentence
      game_id: game id 
      user_id: user id that created room (or create a user id at start of db to signify the 'server')
*/

Fwib.starterFwib = function() {
  var noun = ['cat', 'dog', 'elephant', 'child', 'dragon', 'witch', 'king', 'queen', 'flower', 'bird', 'kobold', 'gnome', 'elf', 'wizard', 'chess master', 'actor', 'teacher', 'artist', 'bus driver', 'golfer'];
  var ptverb = ['ran', 'climbed', 'looked', 'exclaimed', 'jumped', 'flew', 'dug', 'fell', 'shouted', 'gave', 'rang', 'wrote', 'babysat', 'sat', 'napped', 'caught'];
  var preposition = ['into', 'around', 'in', 'after', 'out of', 'beyond', 'down', 'from', 'through', 'up', 'over', 'off', 'onto', 'by'];
  var adjective = ['purple', 'large', 'tiny', 'yellow', 'magnificent', 'calm', 'jolly', 'talented', 'witty', 'generous'];
  var properNoun = ['Mr. Belvedere', 'President Obama', 'Jiggypuff', 'Spiderman', 'Captain Kirk', 'Aragorn', 'Oprah', 'Magneto', 'Big Bird', 'Kanye West', 'Vladimir Putin', 'Guy Fieri', 'Simon Cowell', 'David Bowie', 'Gloria Steinem', 'The Artist Formerly Known as and Currently Goes by Prince', ];
  var pluralNoun = ['cats', 'dogs', 'elephants', 'children', 'dragons', 'witches', 'kings', 'queens', 'flowers', 'birds', 'kobolds', 'gnomes', 'elves', 'wizards', 'chess masters', 'actors', 'teachers', 'artists', 'bus drivers', 'golfers'];

  var randomer = function(array) {
    return array[Math.floor(Math.random() * array.length)];
  } 
  var fwib = ['The ' + randomer(noun) + ' ' + randomer(ptverb) + ' ' + randomer(preposition) + ' the ' + randomer(noun), randomer(properNoun) + ' and the ' + randomer(adjective) + ' ' + randomer(pluralNoun) + ' ' + randomer(ptverb)];

  var starter = randomer(fwib);
  console.log(starter);

  return starter;
}
