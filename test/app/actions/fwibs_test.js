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
              game_id: 1,
              game_hash: 'abc123',
            }
          ])
        })
        .then(function() {
          return pg('users').insert([
            {
              user_id: 1,
              username: 'Player1',
              active_game: 1,
            },
            {
              user_id: 2,
              username: 'Player2',
              active_game: 1,
            }
          ])
        })
        .then(function(){
          return pg('fwibs').insert([
            {
              fwib_content: 'This is an example of Fwibble',
              game_id: 1, 
              user_id: 1,
            },
            {
              fwib_content: 'Sample words and phrases right here',
              game_id: 1, 
              user_id: 1,
            }
          ])
        })
    })


    it_('should list all fwibs of a game', function * () {
      
      yield Fwib.allOfGame(1)
        .catch(function(error) {
          console.error('error retreiving fwibs', error)
        })
        .then(function(fwibs) {
          expect(fwibs).to.have.length(2);
          expect(fwibs[0].fwib_content).to.equal('This is an example of Fwibble');
        })
    })

    it_('should create a new fwib', function * () {

      let newFwib = {
        fwib_content: 'New Fwibble in the database word',
        game_id: 1,
        user_id: 2,
      }

      yield Fwib.create(newFwib)
        .catch(function(error) {
          console.error('error inserting fwib', error);
        })
        .then(function(fwibs) {
          expect(fwibs[0].fwib_content).to.equal('New Fwibble in the database word');
          expect(fwibs[0].game_id).to.equal(1);
          expect(fwibs[0].user_id).to.equal(2);
        })
    })

    it_('should insert a random fwib when prompted', function * () {

      let newFwib = {
        fwib_content: Fwib.starterFwib(),
        game_id: 1,
        user_id: 1
      }

      yield Fwib.create(newFwib)
        .catch(function(error) {
          console.error('error in inserting fwib', error);
        })
        .then(function(fwibs) {
          expect(fwibs[0].fwib_content).to.exist;
          expect(fwibs[0].game_id).to.equal(1);
          expect(fwibs[0].user_id).to.equal(1);
        })      
    })

    it_('should list all fwibs of a user', function * () {

      yield Fwib.allOfUser(1,1)
        .catch(function(error) {
          console.error('error retreiving fwibs', error);
        })
        .then(function(fwibs) {
          expect(fwibs).to.have.length(2);
          expect(fwibs[0].fwib_content).to.equal('This is an example of Fwibble');
          expect(fwibs[1].fwib_content).to.equal('Sample words and phrases right here');
        })
    })

    it_('should list no fwibs for a game that does not exist', function * () {

      yield Fwib.allOfGame(404)
        .catch(function(error) {
          console.error('error in retrieving fwibs', error);
        })
        .then(function(fwibs) {
          expect(fwibs).to.have.length(0);
        })
    })

})
})

