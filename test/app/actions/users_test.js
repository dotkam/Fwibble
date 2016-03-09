require('../../test-helper.js')  // <--- This must be at the top of every test file.

var User = require(__app + '/actions/users');
var pg      = require('../../../db/db_setup');
var dbCleaner = require('knex-cleaner');

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

    xit('should list the active room of a user', function() {

      User.findActiveRoom(1)
        .catch(function(error) {
          console.error('error retrieving users', error)
        })
        .then(function(rooms) {
          expect(rooms).to.have.length(1);
          expect(rooms[0].active_room).to.equal(1);
        })
    })

    xit('should create a new user', function() {
      var newUser = {
        username: 'PlayerTwo',
        active_room: 2,
      }

      User.create(newUser)
        .catch(function(error) {
          console.log('error inserting user', error)
        })
        .then(function(user) {
          expect(user.user_id).to.equal(2);
          expect(user.username).to.equal('PlayerTwo');
          expect(user.active_room).to.equal(2);
        })
    })

    xit('should allow user to join a game room', function() {
      var newJoin ={
        user_id: 2,
        room_id: 2
      }

      User.joinRoom(newJoin)
        .catch(function(error) {
          console.error('error joining room', error)
        })
        .then(function(gameroom) {
          expect(gameroom.user_id).to.equal(2);
          expect(gameroom.room_id).to.equal(2);
        })
    })

    xit('should show all games user is a part of', function() {

      User.allRoom(1)
        .catch(function(error) {
          console.error('error retrieving rooms', error)
        })
        .then(function(rooms) {
          expect(rooms).to.have.length(2);
        })
    })
})
})