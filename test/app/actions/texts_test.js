"use strict"
require('../../test-helper.js') // <--- This must be at the top of every test file.

const Text = require(__app + '/actions/texts');
const pg      = require('../../../db/db_setup');
const dbCleaner = require('knex-cleaner');

describe('Texts model', function() {
  describe('interface with database', function() {

  	beforeEach(function() {
      return dbCleaner.clean(pg, {mode: 'truncate'})
        .then(function() {
          return pg('texts').insert([
            {
              text_id: 1,
              text_content: 'This is an example of Fwibble',
              room_id: 1, 
              user_id: 1,
            },
          ])
        })
    })

    it_('should list all texts of a room', function * () {
      yield Text.allOfRoom(1)
        .then(function(texts) {
          expect(texts).to.have.length(1);
          expect(texts[0].text_content).to.equal('This is an example of Fwibble');
        })
        .catch(function(error) {
          console.error('error inserting text', error)
        })
    })

    it_('should create a new text', function * () {
      let newText = {
        text_content: 'New Fwibble in the database word',
        room_id: 1,
        user_id: 2,
      }

      yield Message.create(newText)
        .then(function(text) {
          expect(text.text_content).to.equal('New Fwibble in the database word');
          expect(text.room_id).to.equal(1);
          expect(text.user_id).to.equal(2);
          expect(text.createdAt).to.be.ok;
        })
        .catch(function(error) {
          console.error('error inserting text', error)
        })
    })
})
})

