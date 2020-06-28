DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS hash_table;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  pic_url VARCHAR(255)
);

CREATE TABLE messages (
  message_id    SERIAL PRIMARY KEY,
  created_at    	TIMESTAMP DEFAULT now(),
  user_id            INTEGER,
  message        VARCHAR(200) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users
);

CREATE TABLE hash_table (
  id  SERIAL,
  bcrypt_hash VARCHAR(255),
    PRIMARY KEY (id)
);
