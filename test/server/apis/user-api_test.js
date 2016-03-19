"use strict"
require('../../test-helper.js')

const UserAPI		= require(__server + '/apis/user-api');
const pg				= require('../../../db/db_setup');
const request		= require('supertest-as-promised');
const dbCleaner	= require('knex-cleaner');

describe('User API', function() {

	var app = TestHelper.createApp()
		app.use('/user', UserAPI)
		app.testReady()

	before(function() {
		return dbCleaner.clean(pg, {mode: 'truncate'})
			.catch(function(error) {
				console.error('error truncating test db', error)
			})
	})

	xit_('should not allow signin with blank username', function * () {
		return request(app)
		.post('/user/signin')
		.send({"username":"","password":""})
		.expect(200)
		.expect(function(res) {
			console.log('blank username response:', res.body)
			expect(res.body.errMessage).to.equal(' not found. Please create an account.')
			expect(res.body.userStatus).to.equal(false)
			expect(res.body.passStatus).to.equal(false)
			expect(res.body.activeGame).to.equal(null)
			expect(res.body.sessToken).to.equal(null)
		})
	})

	xit_('should not allow signin with unknown user and password', function * () {
		return request(app)
		.post('/user/signin')
		.send({"username":"alfred","password":"tangerine"})
		.expect(200)
		.expect(function(res) {
			console.log('blank username response:', res.body)
			expect(res.body.errMessage).to.equal('alfred not found. Please create an account.')
			expect(res.body.userStatus).to.equal(false)
			expect(res.body.passStatus).to.equal(false)
			expect(res.body.activeGame).to.equal(null)
			expect(res.body.sessToken).to.equal(null)
		})
	})

	it_('should create an account and immediately sign in', function * () {
		return request(app)
		.post('/user/signup')
		.send({"username":"alfred","password":"tangerine"})
		.expect(200)
		.expect(function(res) {
			expect(res.body.errMessage).to.equal(null)
			expect(res.body.userStatus).to.equal(true)
			expect(res.body.passStatus).to.equal(true)
			// expect(res.body.activeUser).to.equal(?)
			// expect(res.body.activeGame).to.equal(?)
			// expect(res.body.sessToken).to.equal(?)
		})
	})





})