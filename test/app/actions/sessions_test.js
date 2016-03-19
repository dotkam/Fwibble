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
              username: 'Player1',
              password: 'password',
              active_game: 'abc123',
            },
            {
              username: 'Player2',
              password: 'drowssap',
              active_game: 'abc123',
            }
          ])
        })
        .then(function() {
          return pg('sessions').insert([
            {
              session_id: 33,
              username: 'Player1',
              token: 'thisisntarealtoken'
            },
            {
              session_id: 37,
              username: 'Player2',
              token: 'dontworryaboutititsallfine'
            }
          ])
        })
    })

    it_('should create a session and token', function * () {

      let newSession = {
        username: 'Player1'
      }
       
      yield Session.create(newSession)
        .catch(function(error) {
          console.log('error inserting session', error);
        })
        .then(function(session) {
          console.log('session created successfully', session);
        })
      
      Session.findTokenByUsername('Player1')
        .catch(function(error) {
          console.log('error locating token', error);
        })
        .then(function(session) {
          console.log(session);
          expect(session).to.exist;
        })
    })

    it_('should find a session with username', function * () {

      yield Session.findIdByUsername('Player2')
        .catch(function(error) {
          console.log('error retrieving session', error);
        })
        .then(function(session) {
          expect(session).to.equal(37);
        })
    })


    it_('should return a session-user join table', function * () {
      
      yield Session.userInnerJoin('Player1')
      .catch(function(error) {
        console.log('error retrieving join table', error);
      })
      .then(function(join) {
        expect(join.token).to.equal('thisisntarealtoken');
        expect(join.active_game).to.equal('abc123');
      })
    })

    it_('should delete a session', function * () {

    yield Session.deleteByUsername('Player1')
      .catch(function(error) {
        console.log('error retrieving session', error);
      })
      .then(function(session) {
        console.log('SESSION', session)
      })
    })


  })
})
