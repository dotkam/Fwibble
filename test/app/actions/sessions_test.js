"use strict"
require('../../test-helper.js') // <--- This must be at the top of every test file.

const Session = require(__app + '/actions/sessions');
const pg      = require('../../../db/db_setup');
const dbCleaner = require('knex-cleaner');

describe('Sessions model', function() {
  describe('can interface with a clean test database', function() {

    beforeEach(function() {
      return dbCleaner.clean(pg, {mode: 'truncate'})
        .catch(function(error) {
          console.error('error inserting text', error)
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
            }
          ])
        })
    })

    it_('should create a session and token', function * () {

      let newSession = {
        user_id: 1
      }
       
      yield Session.create(newSession)
        .catch(function(error) {
          console.log('error inserting session', error);
        })
        .then(function(session) {
          console.log(session);
          expect(session[0].user_id).to.equal(1);
        })
    })
  })
})
