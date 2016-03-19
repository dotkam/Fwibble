"use strict"
require('../../test-helper.js') // <--- This must be at the top of every test file.

const Game = require(__app + '/actions/games');
const Fwib = require(__app + '/actions/fwibs');
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
		    .then(function() {
          return pg('games').insert([
            {
              game_hash: 'abc123',
              game_title: 'test',
              game_status: 'open',
              game_creator: 'Player1'
            },
            {
              game_hash: 'ghi789',
              game_title: 'yes, i am dog',
              game_status: 'in progress',
              game_status: 'Player2'
            },
            {
              game_hash: 'jkl000',
              game_title: 'neuroplasticity lasts forever',
              game_status: 'open',
              game_creator: 'Player3'
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
  
    xit_('should create a new game and provide a title', function * () {

    let newGame = {
      game_creator: 'Player1'
    }
      
    yield Game.create(newGame)
      .catch(function(error) {
        console.error('error inserting game', error);
      })
      .then(function(game) {
        expect(game.game_creator).to.equal('Player1');
        expect(game.game_title).to.exist;
      })
    })

    xit_('should find all games', function * () {

    yield Game.all()
      .catch(function(error) {
		    console.error('error retrieving users', error);
		  })
		  .then(function(games) {
		    expect(games).to.have.length(3);
		    expect(games[0].game_hash).to.equal('abc123');
		    expect(games[1].game_hash).to.equal('ghi789');
		    expect(games[2].game_hash).to.equal('jkl000');
		  })
    })

    xit_('should change status and find all open games', function * () {

    yield Game.updateToOpen('ghi789')
      .catch(function(error) {
        console.error('error updating status', error);
      })
      .then(function(res) {
        console.log('status updated')
      Game.allJoinable()
      .catch(function(error) {
		    console.error('error retrieving games', error);
		  })
		  .then(function(games) {
		    expect(games).to.have.length(3);
        expect(games[0].game_hash).to.equal('abc123');
        expect(games[0].game_title).to.equal('test');
        expect(games[2].game_hash).to.equal('ghi789');
        expect(games[2].game_title).to.equal('yes, i am dog');
        expect(games[1].game_hash).to.equal('jkl000');
        expect(games[1].game_title).to.equal('neuroplasticity lasts forever');
		  })
    })
    })

    xit_('should change status and find in progress games', function * () {

    yield Game.updateToInProgress('abc123')
      .catch(function(error) {
        console.error('error updating status', error);
      })
      .then(function(res) {
        console.log('status updated')
        Game.allInProgress()
         .catch(function(error) {
           console.error('error retrieving games', error);
         })
         .then(function(games) {
           expect(games).to.have.length(1);
           expect(games[0].game_hash).to.equal('abc123');
           expect(games[0].game_title).to.equal('test');
        })
      })
    })

   xit_('should change status and find completed games', function * () {

    yield Game.updateToCompleted('abc123')
      .catch(function(error) {
        console.error('error updating status', error);
      })
      .then(function(res) {
        console.log('status updated')
      })

    yield Game.allCompleted()
      .catch(function(error) {
        console.error('error retrieving games', error);
      })
      .then(function(games) {
        expect(games).to.have.length(1);
        expect(games[0].game_hash).to.equal('abc123');
        expect(games[0].game_title).to.equal('test');
      })
    })

    xit_('should find games by hash value', function * () {

    yield Game.findIdByHash('ghi789')
      .catch(function(error) {
		    console.error('error retrieving games', error);
		  })
		  .then(function(games) {
		    expect(games).to.exist;
		  })
    })

    xit_('should find and update turns correctly', function * () {

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
