-- npm run heroku:psql

CREATE TABLE items(
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255)
);

-- eventually, when we get onto adding more columns edit seed.psql file