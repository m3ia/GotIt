npm run heroku:psql

CREATE DATABASE pernstack;

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY, 
  description VARCHAR(255)
);
