DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS locations CASCADE;
 

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);
CREATE TABLE locations (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  time TIMESTAMP,
  description VARCHAR(255),
  lat VARCHAR(255) NOT NULL,
  lng VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  tags VARCHAR(255) 
);