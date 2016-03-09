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
              user_id: 7,
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
            },
            {
              room_id: 3,
              room_hash: 'ghi789'
            }
          ])
        })
        .then(function() {
          return pg('user_room').insert([
            {
              user_id: 7,
              room_id: 1
            },
            {
              user_id: 7,
              room_id: 2
            }
          ])
        })
    })

    it_('should list the active room of a user', function * () {

      yield User.findActiveRoom(7)
        .catch(function(error) {
          console.error('error retrieving users', error);
        })
        .then(function(rooms) {
          expect(rooms).to.have.length(1);
          expect(rooms[0].active_room).to.equal('1');
        })
    })

    it_('should create a new user', function * () {
      
      let newUser = {
        username: 'PlayerTwo',
        active_room: 2,
      }

      yield User.create(newUser)
        .catch(function(error) {
          console.log('error inserting user', error);
        })
        .then(function(user) {
          expect(user[0].username).to.equal('PlayerTwo');
          expect(user[0].active_room).to.equal('2');
        })
    })

    it_('should allow user to join a game room', function * () {

      let newJoin ={
        user_id: 7,
        room_id: 3
      }

      yield User.joinRoom(newJoin)
        .catch(function(error) {
          console.error('error joining room', error);
        })
        .then(function(gameroom) {
          expect(gameroom[0].user_id).to.equal(7);
          expect(gameroom[0].room_id).to.equal(3);
        })
    })

    it_('should show all games user is a part of', function * () {

      yield User.allRoom(7)
        .catch(function(error) {
          console.error('error retrieving rooms', error)
        })
        .then(function(rooms) {
          expect(rooms).to.have.length(2);
          expect(rooms[0].room_id).to.equal(1);
        })
    })

    it_('should locate a user id by username', function *() {

      yield User.findIdByUsername('PlayerOne')
        .catch(function(error) {
          console.error('error retrieving user id', error);
        })
        .then(function(userid) {
          expect(userid[0].user_id).to.equal(7);
        })
    })
})
})