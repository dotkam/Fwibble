# Fwibble

## Webpack

How to start up the webpack database:
You'll need to do a global install of webpack: `npm install -g webpack`.
Then run `npm install` in your root directory.
Then type `webpack` into the command line to put all this stuff into a dist. folder.
Run an `npm start`, and you should now be able to pull up the site on localhost:8080.
If you want to automatically update your in-browser view when you make changes, you can run `webpack -w`.
Running `webpack -p` (p for production) will minify and uglify the dist files.

## Database Initialization

To initialize the PostgreSQL environment type `initdb fwibbleDB` in console, then 
`postgres -D fwibbleDB` to open the connection to the database environment.
In another console tab type `createdb development` or `createdb test` 
This creates the database in the FwibbleDB folder.
To load schema, depending on environment, type:
  `psql "dbname=development options=--search_path=public" -f db/fwibble.sql`
OR
  `psql "dbname=test options=--search_path=public" -f db/fwibble.sql`
Seed the database with information`node db/db_setup.js`
IF NEEDED:
   Delete all database tables, while Postgres is running, with `dropdb development`
   Start over at `createdb` steps to recreate database tables.

## Express Server 

Ensure database is running with `postgres -D fwibbleDB`
In another terminal tab run `node server/server.js`
This will allow connection through `localhost:3000` for endpoint and API testing.