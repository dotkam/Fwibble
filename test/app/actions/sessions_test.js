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
        .then(function() {
          return pg('sessions').insert([
            {
              session_id: 33,
              user_id: 1,
              token: 'thisisntarealtoken'
            },
            {
              session_id: 37,
              user_id: 2,
              token: 'dontworryaboutititsallfine'
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
          expect(session.user_id).to.equal(1);
        })
      
      Session.findTokenByUserId(1)
        .catch(function(error) {
          console.log('error locating token', error);
        })
        .then(function(session) {
          console.log(session);
          expect(session).to.exist;
        })
    })

    it_('should find a session with user id', function * () {

      yield Session.findIdByUserId(2)
        .catch(function(error) {
          console.log('error retrieving session', error);
        })
        .then(function(session) {
          expect(session).to.equal(37);
        })
    })

    it_('should delete a session', function * () {

    yield Session.delete(33)
      .catch(function(error) {
        console.log('error retrieving session', error);
      })
      .then(Session.findIdByUserId(1))
      .then(function(session) {
        console.log('SESSION', session)
      })
    })
  })
})
