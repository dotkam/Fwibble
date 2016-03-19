DROP SCHEMA public cascade;
CREATE SCHEMA public;

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL NOT NULL PRIMARY KEY,
  username varchar(20) NOT NULL UNIQUE,
  password varchar,
  active_game varchar
);

CREATE TABLE IF NOT EXISTS games (
  game_id SERIAL NOT NULL PRIMARY KEY,
  game_hash varchar UNIQUE,
  game_title varchar,
  turn_index INTEGER DEFAULT 0,
  game_status varchar DEFAULT 'open',
  game_creator varchar REFERENCES users (username)
);

CREATE TABLE IF NOT EXISTS fwibs (
  fwib_id SERIAL NOT NULL PRIMARY KEY,
  fwib_content varchar NOT NULL,
  game_hash varchar REFERENCES games (game_hash),
  username varchar REFERENCES users (username),
  createdat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  session_id SERIAL NOT NULL PRIMARY KEY,
  username varchar REFERENCES users (username),
  createdat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  token varchar
);