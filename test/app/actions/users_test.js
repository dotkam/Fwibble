"use strict"
require('../../test-helper.js')  // <--- This must be at the top of every test file.

const User = require(__app + '/actions/users');
const pg      = require('../../../db/db_setup');
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
        .then(function() {
          return pg('rooms').insert([
            {
              room_id: 1,
              room_hash: 'abc123'
            },
            {
              room_id: 2,
              room_hash: 'def456'
            }
          ])
        })
        .then(function() {
          return pg('user_room').insert([
            {
              user_id: 1,
              room_id: 1
            },
            {
              user_id: 1,
              room_id: 2
            }
          ])
        })
    })

    it_('should list the active room of a user', function * () {

      yield User.findActiveRoom(1)
        .then(function(rooms) {
          expect(rooms).to.have.length(1);
          expect(rooms[0].active_room).to.equal(1);
        })
        .catch(function(error) {
          console.error('error retrieving users', error)
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
        .catch(function(error) {
          console.error('error inserting user', error)
        })
    })

    it_('should allow user to join a game room', function * () {
      let newJoin ={
        user_id: 2,
        room_id: 2
      }

      yield User.joinRoom(newJoin)
        .then(function(gameroom) {
          expect(gameroom.user_id).to.equal(2);
          expect(gameroom.room_id).to.equal(2);
        })
        .catch(function(error) {
          console.error('error joining room', error)
        })
    })

    it_('should allow user to join a game room', function * () {
      let newJoin ={
        user_id: 2,
        room_id: 2
      }

      yield User.joinRoom(newJoin)
        .then(function(gameroom) {
          expect(gameroom.user_id).to.equal(2);
          expect(gameroom.room_id).to.equal(2);
        })
        .catch(function(error) {
          console.error('error joining room', error)
        })
    })
})
})