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
              active_game: 1
            },
          ])
        })
        .then(function() {
          return pg('games').insert([
            {
              game_id: 1,
              game_hash: 'abc123'
            },
            {
              game_id: 2,
              game_hash: 'def456'
            },
            {
              game_id: 3,
              game_hash: 'ghi789'
            }
          ])
        })
        .then(function() {
          return pg('user_game').insert([
            {
              user_id: 7,
              game_id: 1
            },
            {
              user_id: 7,
              game_id: 2
            }
          ])
        })
    })

    it_('should list the active game of a user', function * () {

      yield User.findActiveGame(7)
        .catch(function(error) {
          console.error('error retrieving users', error);
        })
        .then(function(games) {
          expect(games).to.have.length(1);
          expect(games[0].active_game).to.equal('1');
        })
    })

    it_('should create a new user', function * () {
      
      let newUser = {
        username: 'PlayerTwo',
        password: 'password',
        active_game: 2,
      }

      yield User.create(newUser)
        .catch(function(error) {
          console.log('error inserting user', error);
        })
        .then(function(user) {
          console.log(user);
          expect(user[0].username).to.equal('PlayerTwo');
          expect(user[0].active_game).to.equal('2');
        })

      yield User.findIdByUsername('PlayerTwo')
        .catch(function(error) {
          console.log('error finding user', error);
        })
        .then(function(user){
          var userId = user[0].user_id;
          User.checkPassword(userId, 'password123')
           .then(function(res){
            expect(res).to.equal(false);
          })
        })
    })

    it_('should allow user to join a game', function * () {

      let newJoin ={
        user_id: 7,
        game_id: 3
      }

      yield User.joinGame(newJoin)
        .catch(function(error) {
          console.error('error joining game', error);
        })
        .then(function(game) {
          expect(game[0].user_id).to.equal(7);
          expect(game[0].game_id).to.equal(3);
        })
    })

    it_('should show all games user is a part of', function * () {

      yield User.allGame(7)
        .catch(function(error) {
          console.error('error retrieving games', error)
        })
        .then(function(games) {
          expect(games).to.have.length(2);
          expect(games[0].game_id).to.equal(1);
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