"use strict"
require('../../test-helper.js') // <--- This must be at the top of every test file.

const Game = require(__app + '/actions/games');
const pg      = require('../../../db/db_setup');
const dbCleaner = require('knex-cleaner');

describe('Games model', function() {
  describe('can interface with a clean test database', function() {

    beforeEach(function() {
      return dbCleaner.clean(pg, {mode: 'truncate'})
        .catch(function(error) {
          console.error('error inserting text', error)
        })
		.then(function() {
          return pg('games').insert([
            {
              game_hash: 'abc123',
              game_title: 'test'
            },
            {
              game_hash: 'ghi789',
              game_title: 'yes, i am dog'
            }
          ])
        })
        .then(function() {
          return pg('users').insert([
            {
              username: 'Player1',
              password: 'password',
              active_game: 'abc123'
            },
            {
              username: 'Player2',
              password: 'drowssap',
              active_game: 'abc123'
            },
            {
              username: 'Player3',
              password: 'nptpassword',
              active_game: 'abc123'
            }
          ])
        })
        .then(function(){
          return pg('fwibs').insert([
            {
              fwib_id: 1,
              fwib_content: 'This is an example of Fwibble',
              game_hash: 'abc123', 
              username: 'Player1'
            },
          ])
        })
	})
  
    it_('should create a new game and provide a hash', function * () {

    let newGame = {
      game_title: 'Neuroplasticity lasts forever'
    }
      
    yield Game.create(newGame)
      .catch(function(error) {
        console.error('error inserting game', error);
      })
      .then(function(game) {
        expect(game.game_title).to.equal('Neuroplasticity lasts forever');
      })
    })

    // it_('should find all users in a game room', function * () {

    // yield Game.allUser('abc123')
    //   .catch(function(error) {
		  //   console.error('error retrieving users', error);
		  // })
		  // .then(function(users) {
		  //   expect(users).to.have.length(3);
		  //   expect(users[0].username).to.equal('Player1');
		  //   expect(users[1].username).to.equal('Player2');
		  //   expect(users[2].username).to.equal('Player3');
		  // })
    // })

    it_('should find all active games', function * () {

    yield Game.allById()
      .catch(function(error) {
		    console.error('error retrieving games', error);
		  })
		  .then(function(games) {
		    expect(games).to.have.length(2);
		    expect(games[0].game_hash).to.equal('abc123');
		    expect(games[1].game_hash).to.equal('ghi789');
		    expect(games[0].game_title).to.equal('test');
		    expect(games[1].game_title).to.equal('yes, i am dog');
		  })
    })

    it_('should find games by hash value', function * () {

    yield Game.findIdByHash('ghi789')
      .catch(function(error) {
		    console.error('error retrieving games', error);
		  })
		  .then(function(games) {
		    expect(games).to.exist;
		  })
    })

    it_('should find and update turns correctly', function * () {

    yield Game.findTurn('abc123')
      .catch(function(error) {
        console.error('error updating turn', error);
      })
      .then(function(game) {
        expect(game).to.equal(0);
      })

    yield Game.updateTurn('abc123', 2)
      .catch(function(error) {
        console.error('error updating turn', error);
      })
    
    yield Game.findTurn('abc123')
      .catch(function(error) {
        console.error('error updating turn', error);
      })
      .then(function(game) {
        expect(game).to.equal(2);
      })
    })
})
})
