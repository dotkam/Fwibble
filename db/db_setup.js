/*
  initdb fwibbleDB
    Create environment for databases to live
  postgres -D fwibbleDB
    Open a connection to that database environment
  createdb development
  createdb test
    Create a database named development in fwibbleDB directory  
  psql "dbname=development options=--search_path=public" -f db/fwibble.sql
  psql "dbname=test options=--search_path=public" -f db/fwibble.sql
    Apply the db/fwibble.sql schema to the development database
  node db/db_setup.js
    Seed the database with information

  IF NEEDED
  dropdb development
    Delete all database tables (for testing purposes only!)
    do this while postgres is running, and then after drop start over with createdb development, etc.
*/

// var env = process.env.NODE_ENV || 'development';
// var config = {
//     development: {
//       database: "development",
//       host: "localhost",
//       port: 5432
//     }
//     // production: {
//     //     database: 'milk',
//     //     host: 'honey',
//     //     port: 'vinegar'
//     // }
// }

const config = require('../knexfile');
const env    = process.env.NODE_ENV || 'development';
const pg     = require('knex')(config[env]);

module.exports = pg;

// require('../db/seeds/seed_users.js');
// require('../db/seeds/seed_games.js');
// require('../db/seeds/seed_fwibs.js');

