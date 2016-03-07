users_test.js
"use strict"
require(TEST_HELPER) // <--- This must be at the top of every test file.

const User = require(__models + '/users');
const pg      = require('../../db_setup');
const dbCleaner = require('knex-cleaner');

describe('Users model', function() {
  describe('interface with database', function() {

  	beforeEach(function() {
      return dbCleaner.clean(pg, {mode: 'truncate'})
        .then(function() {
          return pg('users').insert([
            {
              user_id: 1,
              username: 'PlayerOne', 
              active_room: 1
            },
          ])
        })
    })

    it_('should list all texts of a room', function * () {
      yield User.findActiveRoom(1)
        .then(function(rooms) {
          expect(rooms).to.have.length(1);
          expect(rooms[0].username).to.equal('PlayerOne');
        })
        .catch(function(err) {
          if (err) console.log('error retrieving user from db', err)
        })
    })

    it_('should create a new user', function * () {
      let newUser = {
        user_id: 2,
        username: 'PlayerTwo',
        active_room: 2,
      }

      yield User.create(newUser)
        .then(function(user) {
          expect(user.user_id).to.equal(2);
          expect(user.username).to.equal('PlayerTwo');
          expect(user.active_room).to.equal(2);
        })
        .catch(function(err) {
          if err console.log('error retrieving user from db', err)
        })
    })
})
})