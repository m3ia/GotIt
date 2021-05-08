-- npm run heroku:psql

CREATE TABLE items(
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255)
);

-- eventually, when we get onto adding more columns edit seed.psql file


--"CREATE TABLE awards (
--    id INTEGER PRIMARY KEY,
--    recipient TEXT NOT NULL,
--    award_name TEXT DEFAULT 'Grammy'
-- );"

-- "ALTER TABLE celebs 
-- ADD COLUMN twitter_handle TEXT; 
 
-- SELECT * FROM celebs; " 


ALTER TABLE items
ADD COLUMN is_done BOOLEAN DEFAULT FALSE,
ADD COLUMN recur_freq CHAR (20),
ADD COLUMN recur_start_date DATE,
ADD COLUMN recur_end_date DATE,
ADD COLUMN due_date DATE,
ADD COLUMN url VARCHAR (1000),
ADD COLUMN quantity INT DEFAULT 1,
ADD COLUMN description VARCHAR (500),
ADD COLUMN user_assigned INT,
ADD COLUMN date_created TIMESTAMPTZ DEFAULT Now(),
ADD COLUMN date_updated TIMESTAMPTZ DEFAULT Now();

