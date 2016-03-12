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
              game_id: 22,
              game_hash: 'abc123',
              game_title: 'test'
            },
            {
              game_id: 27,
              game_hash: 'ghi789',
              game_title: 'yes, i am dog'
            }
          ])
        })
        .then(function() {
          return pg('users').insert([
            {
              user_id: 1,
              username: 'Player1',
              active_game: 22,
            },
            {
              user_id: 2,
              username: 'Player2',
              active_game: 22,
            },
            {
              user_id: 3,
              username: 'Player3',
              active_game: 22,
            }
          ])
        })
        .then(function() {
          return pg('user_game').insert([
            {
              user_id: 1,
              game_id: 22,
            },
            {
              user_id: 2,
              game_id: 22,
            },
            {
              user_id: 3,
              game_id: 22,
            }
          ])
        })
        .then(function(){
          return pg('fwibs').insert([
            {
              fwib_id: 1,
              fwib_content: 'This is an example of Fwibble',
              game_id: 22, 
              user_id: 1,
            },
          ])
        })
	})


	it_('should create a first game', function * () {

    let newGame1 = {
		  game_hash: 'def456',
		  game_title: 'this is also game'
    }
      
    yield Game.create(newGame1)
      .catch(function(error) {
		    console.error('error inserting game', error);
		  })
      .then(function(game) {
        expect(game[0].game_hash).to.equal('def456');
		    expect(game[0].game_title).to.equal('this is also game');
		  })
	  })

    it_('should find all users in a game room', function * () {

    yield Game.allUser(22)
      .catch(function(error) {
		    console.error('error retrieving users', error);
		  })
		  .then(function(users) {
		    expect(users).to.have.length(3);
		    expect(users[0].user_id).to.equal(1);
		    expect(users[1].user_id).to.equal(2);
		    expect(users[2].user_id).to.equal(3);
		  })
    })

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
		    expect(games).to.have.length(1);
		    expect(games[0].game_id).to.equal(27);
		  })
    })
})
})
