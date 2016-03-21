"use strict"
require('../../test-helper.js')  // <--- This must be at the top of every test file.

const User = require(__app + '/actions/users');
const pg      = require('../../../db/db_setup');
const dbCleaner = require('knex-cleaner');

describe('Users model', function() {
  describe('interface with database', function() {

  	beforeEach(function() {
      return dbCleaner.clean(pg, {mode: 'truncate'})
        .catch(function(error) {
          console.error('error inserting text', error)
        })
        .then(function() {
          return pg('users').insert([
            {
              username: 'PlayerOne', 
              password: 'password',
              active_game: 'abc123'
            },
            {
              username: 'PlayerTwo',
              password: 'dorwssap' 
            }
          ])
        })
        .then(function() {
          return pg('games').insert([
            {
              game_hash: 'abc123'
            },
            {
              game_hash: 'def456'
            },
            {
              game_hash: 'ghi789'
            }
          ])
        })
    })

    it_('should list the active game of a user', function * () {

      yield User.findActiveGame('PlayerOne')
        .catch(function(error) {
          console.error('error retrieving users', error);
        })
        .then(function(games) {
          expect(games).to.equal('abc123');
        })
    })

    it_('should create a new user', function * () {
      
      let newUser = {
        username: 'PlayerThree',
        password: 'password12',
        active_game: 'abc123',
      }

      yield User.create(newUser)
        .catch(function(error) {
          console.log('error inserting user', error);
        })
        .then(function(user) {
          console.log(user);
          expect(user.username).to.equal('PlayerThree');
          expect(user.active_game).to.equal('abc123');
        })

      yield User.checkPassword('PlayerThree', 'password123')
           .then(function(res){
            expect(res).to.equal(false);
          })
        })
    })

    it_('should update an active room', function *() {

      yield User.addActiveRoom('PlayerTwo', 'ghi789')
        .catch(function(error) {
          console.error('error updating active room', error);
        })
    })

    it_('should delete an active room', function *() {

      yield User.deleteActiveRoom('PlayerOne')
        .catch(function(error) {
          console.error('error deleting active room', error);
        })
    })
})