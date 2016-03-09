"use strict"
require('../../test-helper.js') // <--- This must be at the top of every test file.

const Room = require(__app + '/actions/rooms');
const pg      = require('../../../db/db_setup');
const dbCleaner = require('knex-cleaner');

describe('Rooms model', function() {
  describe('can interface with a clean test database', function() {

    beforeEach(function() {
      return dbCleaner.clean(pg, {mode: 'truncate'})
        .catch(function(error) {
          console.error('error inserting text', error)
        })
		.then(function() {
          return pg('rooms').insert([
            {
              room_id: 22,
              room_hash: 'abc123',
              room_title: 'test room'
            },
            {
              room_id: 27,
              room_hash: 'ghi789',
              room_title: 'yes, i am dog'
            }
          ])
        })
        .then(function() {
          return pg('users').insert([
            {
              user_id: 1,
              username: 'Player1',
              active_room: 22,
            },
            {
              user_id: 2,
              username: 'Player2',
              active_room: 22,
            },
            {
              user_id: 3,
              username: 'Player3',
              active_room: 22,
            }
          ])
        })
        .then(function() {
          return pg('user_room').insert([
            {
              user_id: 1,
              room_id: 22,
            },
            {
              user_id: 2,
              room_id: 22,
            },
            {
              user_id: 3,
              room_id: 22,
            }
          ])
        })
        .then(function(){
          return pg('texts').insert([
            {
              text_id: 1,
              text_content: 'This is an example of Fwibble',
              room_id: 22, 
              user_id: 1,
            },
          ])
        })
	})


	it_('should create a first room', function * () {

      let newRoom1 = {
		room_hash: 'def456',
		room_title: 'this is also room'
      }
      
      yield Room.create(newRoom1)
        .catch(function(error) {
		  console.error('error inserting room', error);
		})
        .then(function(room) {
          expect(room[0].room_hash).to.equal('def456');
		  expect(room[0].room_title).to.equal('this is also room');
		})
	})

    it_('should find all users in a game room', function * () {

      yield Room.allUser(22)
        .catch(function(error) {
		  console.error('error retrieving users', error);
		})
		.then(function(users) {
		  expect(users).to.have.length(3);
		  expect(users[0].user_id).to.equal(1);
		  expect(users[1].user_id).to.equal(2);
		  expect(users[2].user_id).to.equal(3);
		})
    })

    it_('should find all active game rooms', function * () {

      yield Room.allById()
        .catch(function(error) {
		  console.error('error retrieving rooms', error);
		})
		.then(function(rooms) {
		  expect(rooms).to.have.length(2);
		  expect(rooms[0].room_hash).to.equal('abc123');
		  expect(rooms[1].room_hash).to.equal('ghi789');
		  expect(rooms[0].room_title).to.equal('test room');
		  expect(rooms[1].room_title).to.equal('yes, i am dog');
		})
    })

    it_('should find game rooms by hash value', function * () {

      yield Room.findIdByHash('ghi789')
        .catch(function(error) {
		  console.error('error retrieving rooms', error);
		})
		.then(function(rooms) {
		  expect(rooms).to.have.length(1);
		  expect(rooms[0].room_id).to.equal(27);
		})
    })
})
})
