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
  game_hash varchar,
  game_title varchar,
  turn_index INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS user_game (
  user_game_id SERIAL NOT NULL PRIMARY KEY,
  user_id INTEGER REFERENCES users (user_id),
  game_id INTEGER REFERENCES games (game_id)
);

CREATE TABLE IF NOT EXISTS fwibs (
  fwib_id SERIAL NOT NULL PRIMARY KEY,
  fwib_content varchar NOT NULL,
  game_id INTEGER REFERENCES games (game_id),
  user_id INTEGER REFERENCES users (user_id),
  createdat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);