/*
  initdb fwibbleDB
    Create environment for databases to live
  postgres -D fwibbleDB
    Open a connection to that database environment
  createdb development
    Create a database named development in fwibbleDB directory
  psql "dbname=development options=--search_path=public" -f db/fwibble.sql
    Apply the db/fwibble.sql schema to the development database
  node db/db_setup.js
    Seed the database with information
*/

var env = process.env.NODE_ENV || 'development';
var config = {
    development: {
      database: "development",
      host: "localhost",
      port: 5432
    },
    // production: {
    //     database: 'milk',
    //     host: 'honey',
    //     port: 'vinegar'
    // }
}