"use strict"
require('../../test-helper.js') // <--- This must be at the top of every test file.

const Text = require(__app + '/actions/texts');
const pg      = require('../../../db/db_setup');
const dbCleaner = require('knex-cleaner');

describe('Texts model', function() {
  describe('interface with database', function() {

  	beforeEach(function() {
      return dbCleaner.clean(pg, {mode: 'truncate'})
        .catch(function(error) {
          console.error('error inserting text', error)
        })
        .then(function() {
          return pg('rooms').insert([
            {
              room_id: 1,
              room_hash: 'abc123',
            }
          ])
        })
        .then(function() {
          return pg('users').insert([
            {
              user_id: 1,
              username: 'Player1',
              active_room: 1,
            },
            {
              user_id: 2,
              username: 'Player2',
              active_room: 1,
            }
          ])
        })
        .then(function(){
          return pg('texts').insert([
            {
              text_content: 'This is an example of Fwibble',
              room_id: 1, 
              user_id: 1,
            },
            {
              text_content: 'Sample words and phrases right here',
              room_id: 1, 
              user_id: 1,
            }
          ])
        })
    })


    it_('should list all texts of a room', function * () {
      
      yield Text.allOfRoom(1)
        .catch(function(error) {
          console.error('error retreiving texts', error)
        })
        .then(function(texts) {
          expect(texts).to.have.length(2);
          expect(texts[0].text_content).to.equal('This is an example of Fwibble');
        })
    })

    it_('should create a new text', function * () {

      let newText = {
        text_content: 'New Fwibble in the database word',
        room_id: 1,
        user_id: 2,
      }

      yield Text.create(newText)
        .catch(function(error) {
          console.error('error inserting text', error);
        })
        .then(function(texts) {
          expect(texts[0].text_content).to.equal('New Fwibble in the database word');
          expect(texts[0].room_id).to.equal(1);
          expect(texts[0].user_id).to.equal(2);
        })
    })

    it_('should list all texts of a user', function * () {

      yield Text.allOfUser(1,1)
        .catch(function(error) {
          console.error('error retreiving texts', error);
        })
        .then(function(texts) {
          expect(texts).to.have.length(2);
          expect(texts[0].text_content).to.equal('This is an example of Fwibble');
          expect(texts[1].text_content).to.equal('Sample words and phrases right here');
        })
    })

    it_('should list no texts for a game room that does not exist', function * () {

      yield Text.allOfRoom(404)
        .catch(function(error) {
          console.error('error in retrieving texts', error);
        })
        .then(function(texts) {
          expect(texts).to.have.length(0);
        })
    })
})
})

