"use strict"
require('../../test-helper.js') // <--- This must be at the top of every test file.

const Fwib = require(__app + '/actions/fwibs');
const pg      = require('../../../db/db_setup');
const dbCleaner = require('knex-cleaner');

describe('Fwibs model', function() {
  describe('interface with database', function() {

  	beforeEach(function() {
      return dbCleaner.clean(pg, {mode: 'truncate'})
        .catch(function(error) {
          console.error('error inserting text', error)
        })
        .then(function() {
          return pg('games').insert([
            {
              game_hash: 'abc123',
            }
          ])
        })
        .then(function() {
          return pg('users').insert([
            {
              username: 'Player1',
              active_game: 'abc123'
            },
            {
              username: 'Player2',
              active_game: 'abc123'
            }
          ])
        })
        .then(function(){
          return pg('fwibs').insert([
            {
              fwib_content: 'This is an example of Fwibble',
              game_hash: 'abc123', 
              username: 'Player1'
            },
            {
              fwib_content: 'Sample words and phrases right here',
              game_hash: 'abc123', 
              username: 'Player1'
            }
          ])
        })
    })


    xit_('should list all fwibs of a game', function * () {
      
      yield Fwib.allOfGame('abc123')
        .catch(function(error) {
          console.error('error retreiving fwibs', error)
        })
        .then(function(fwibs) {
          expect(fwibs).to.have.length(2);
          expect(fwibs[0].fwib_content).to.equal('This is an example of Fwibble');
        })
    })

    xit_('should create a new fwib', function * () {

      let newFwib = {
        fwib_content: 'New Fwibble in the database word',
        game_hash: 'abc123',
        username: 'Player2'
      }

      yield Fwib.create(newFwib)
        .catch(function(error) {
          console.error('error inserting fwib', error);
        })
        .then(function(fwibs) {
          expect(fwibs.fwib_content).to.equal('New Fwibble in the database word');
          expect(fwibs.game_hash).to.equal('abc123');
          expect(fwibs.username).to.equal('Player2');
        })
    })

    xit_('should list all fwibs of a user', function * () {

      yield Fwib.allOfUser('abc123', 'Player1')
        .catch(function(error) {
          console.error('error retreiving fwibs', error);
        })
        .then(function(fwibs) {
          expect(fwibs).to.have.length(2);
          expect(fwibs[0].fwib_content).to.equal('This is an example of Fwibble');
          expect(fwibs[1].fwib_content).to.equal('Sample words and phrases right here');
        })
    })

    xit_('should list no fwibs for a game that does not exist', function * () {

      yield Fwib.allOfGame('def456')
        .catch(function(error) {
          console.error('error in retrieving fwibs', error);
        })
        .then(function(fwibs) {
          expect(fwibs).to.have.length(0);
        })
    })

})
})

