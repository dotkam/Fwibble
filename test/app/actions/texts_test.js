require('../../test-helper.js') // <--- This must be at the top of every test file.

var Text = require(__app + '/actions/texts');
var pg      = require('../../../db/db_setup');
var dbCleaner = require('knex-cleaner');

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
              room_hash: 'abc123',
            }
          ])
        })
        .then(function() {
          return pg('users').insert([
            {
              username: 'Player1',
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
          ])
        })
    })


    xit('should list all texts of a room', function () {
      Text.allOfRoom(1)
        .catch(function(error) {
          console.error('error retreiving texts', error)
        })
        .then(function(texts) {
          console.log(texts);
          expect(texts).to.have.length(1);
          expect(texts[0].text_content).to.equal('This is an example');
        })

    })

    xit('should create a new text', function () {
      var newText = {
        text_content: 'New Fwibble in the database word',
        room_id: 1,
        user_id: 2,
      }

      Text.create(newText)
        .catch(function(error) {
          console.error('error inserting text', error)
        })
        .then(function(text) {
          expect(text.text_content).to.equal('New Fwibble in the database word');
          expect(text.room_id).to.equal(1);
          expect(text.user_id).to.equal(2);
          expect(text.createdAt).to.be.ok;
        })
    })
})
})

