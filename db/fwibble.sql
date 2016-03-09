DROP SCHEMA public cascade;
CREATE SCHEMA public;

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL NOT NULL PRIMARY KEY,
  username varchar(20) NOT NULL UNIQUE,
  password varchar,
  active_room varchar
);

CREATE TABLE IF NOT EXISTS rooms (
  room_id SERIAL NOT NULL PRIMARY KEY,
  room_hash varchar
);

CREATE TABLE IF NOT EXISTS user_room (
  user_room_id SERIAL NOT NULL PRIMARY KEY,
  user_id INTEGER REFERENCES users (user_id),
  room_id INTEGER REFERENCES rooms (room_id)
);

CREATE TABLE IF NOT EXISTS texts (
  text_id SERIAL NOT NULL PRIMARY KEY,
  text_content varchar NOT NULL,
  room_id INTEGER REFERENCES rooms (room_id),
  user_id INTEGER REFERENCES users (user_id),
  createdAt TIMESTAMP
);