"use strict"
require('../../test-helper.js')  // <--- This must be at the top of every test file.

const FwibAPI   = require(__server + '/apis/fwib-api');
const pg        = require('../../../db/db_setup');
const request   = require('supertest-as-promised')
const dbCleaner = require('knex-cleaner');

describe('Fwib API', function() {

  var app = TestHelper.createApp()
    app.use('/game', FwibAPI)
    app.testReady()

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
            active_game: 2
          },
        ])
        })
        .then(function() {
          return pg('games').insert([
            {
              game_id: 2,
              game_hash: 'abc123'
            }
          ])
        })
        .then(function() {
          return pg('user_game').insert([
            {
              user_id: 7,
              game_id: 2
            }
          ])
        })
    })

  it_('should post a new fwib to database', function * () {
   	
   	return request(app)
   	.post('/game/2/fwib')
   	.send({ fwib_content: 'Look at this fwibble, cower knave!', user_id: 7 })
    .expect(201)
    .expect(function(res) {
       var newFwib = res.body
       console.log("This is the response body bro", res.body)

        expect(newFwib.fwib_id).to.not.be.undefined
        expect(newFwib.user_id).to.equal(7)
        expect(newFwib.room_id).to.equal(7)
        expect(newFwib.fwib_content).to.equal('Look at this fwibble, cower knave!')
        expect(newFwib.createdat).to.not.be.undefined
    })
    .then(function() {
      return request(app)
      .get('/fwib/1')
      .expect(200)
      .expect(function(response) {
      	var fwib = response.body
      	expect(fwib).to.be.an.instanceOf(Array)
        expect(fwib).to.have.length(1)
        expect(fwib[0].fwib_content).to.equal('Look at this fwibble, cower knave!')
      })
    })
})
})


