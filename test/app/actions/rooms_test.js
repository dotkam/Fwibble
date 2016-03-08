"use strict"
require('../../test-helper.js') // <--- This must be at the top of every test file.

const Room = require(__app + '/actions/rooms');
const User = require(__app + '/actions/users');
const pg      = require('../../../db/db_setup');
const dbCleaner = require('knex-cleaner');

describe('Room model', function() {
	describe('can interface with a clean test database', function() {

		beforeEach(function() {
			return dbCleaner.clean(pg, {mode: 'truncate'})
				// .then(function() {
    //       return pg('rooms').insert([
    //         {
    //           room_id:1,
    //           room_hash: 'abc123',
    //         }
    //       ])
    //     })
    //     .then(function() {
    //       return pg('users').insert([
    //         {
    //           user_id:1,
    //           username: 'Player1',
    //           active_room: 1,
    //         }
    //       ])
    //     })
    //     .then(function(){
    //       return pg('texts').insert([
    //         {
    //           text_id: 1,
    //           text_content: 'This is an example of Fwibble',
    //           room_id: 1, 
    //           user_id: 1,
    //         },
    //       ])
    //     })
		})
	})

	it('should create a first room', function * () {

		let newRoom1 = {
			room_id: 1,
			room_hash: 'abc123'
		}

		yield Room.create(newRoom1)
			.then(function(room) {
				expect(room.room_id).to.equal(1);
				expect(Room.allById()).to.have.length(1);
			})
			// .catch(function(err) {
			// 	console.error('error inserting first room', err)
			// })
	})

	it('should create a second room', function * () {
		let newRoom2 = {
			room_id: 2,
			room_hash: 'def456'
		}

		yield Room.create(newRoom2)
			.then(function(room) {
				expect(room.room_id).to.equal(2);
				expect(Room.allById()).to.have.length(2);
			})
			// .catch(function(err) {
			// 	console.error('error inserting second room', err)
			// })
	})

	it('should add user1 and user2 to first room', function * () {
		yield User.create({username: 'user1', password: '', active_room: 1})
		yield User.create({username: 'user2', password: '', active_room: 1})
			.then(function() {
				expect(User.findActiveRoom(1)).to.equal(1);
				expect(User.findActiveRoom(2)).to.equal(1);
			})
	})

	it('should change user1 active_room and find all games for user1', function * () {
		// update user1 active_room to room_id: 2
		// Room.allUser(1) should return all game rooms user1 has participated in
		// ie room_id 1 & 2
	})

})