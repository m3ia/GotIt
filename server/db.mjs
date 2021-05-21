import dotenv from "dotenv";
import pg from "pg";
const {
  types
} = pg;
import pgp from "pg-promise";

// pg-promise doesnt parse dates properly
// handle that here.
const TYPE_DATE = 1082;
types.setTypeParser(TYPE_DATE, (date) => date);

const db = initDb();

export const loginUser = async (email) =>
  await db.one(
    "INSERT INTO users (email) VALUES ($1) ON CONFLICT ON CONSTRAINT unique_user_email DO UPDATE SET date_updated = NOW() RETURNING *",
    [email],
  );

// USERS
export const getUsers = async () =>
  await db.any("SELECT * FROM users ORDER BY id");

// gets a user
export const getUser = async (email) =>
  await db.one("SELECT * FROM users WHERE email = $1", [email]);

// adds a created user to users db
export const addUser = async ({
    first_name,
    last_name,
    email
  }) =>
  await db.any(
    "INSERT INTO users (first_name, last_name, email) VALUES ($1,$2, $3) RETURNING *",
    [first_name, last_name, email],
  );

// update an user
export const updateUser = async (user) => {
  await db.any(
    "UPDATE users SET first_name = $2, last_name = $3, email = $4 WHERE id = $1",
    [user.id, user.first_name, user.last_name, user.email],
  );
};

// deletes a user from db
export const deleteUser = async (id) => {
  await db.result("DELETE FROM users WHERE id = $1", [id]);
};

// LISTS
// gets all active lists from lists.
// TODO: change getItems to get items from specific lists
export const getLists = async (userId) =>
  await db.any("SELECT * FROM lists WHERE owner_id = $1 ORDER BY id", [userId]);

// gets a list

export const getList = async (id) =>
  await db.any("SELECT * FROM lists WHERE id = $1", [id]);

// adds a created list to lists db
export const addList = async ({
    name,
    due_date
  }) =>
  await db.any(
    "INSERT INTO lists (name, due_date) VALUES ($1,$2) RETURNING *",
    [name, due_date],
  );

// update an list
export const updateList = async (list) => {
  await db.any("UPDATE lists SET name = $2, due_date = $3 WHERE id = $1", [
    list.id,
    list.name,
    list.due_date,
  ]);
};

// deletes a list from db
export const deleteList = async (id) => {
  await db.result("DELETE FROM lists WHERE id = $1", [id]);
};

// ITEMS
// TODO: change getItems to get items from specific lists
export const getItems = async (listId) =>
  await db.any("SELECT * FROM items WHERE list_id = $1 ORDER BY id", [listId]);

// gets certain items
export const getItem = async (id) =>
  await db.any("SELECT * FROM items WHERE id = $1", [id]);

// adds a created item to items db
export const addItem = async (name, list_id) =>
  await db.any(
    "INSERT INTO items (name, list_id) VALUES ($1, $2) RETURNING *",
    [name, list_id],
  );

// update an item
export const updateItem = async (item) => {
  await db.any(
    "UPDATE items SET name = $2, is_done = $3, recur_freq = $4,recur_start_date = $5, recur_end_date = $6, due_date = $7, url = $8, quantity = $9, description = $10, user_assigned = $11, date_updated = NOW() WHERE id = $1",
    [
      item.id,
      item.name,
      item.is_done,
      item.recur_freq,
      item.recur_start_date,
      item.recur_end_date,
      item.due_date,
      item.url,
      item.quantity,
      item.description,
      item.user_assigned,
    ],
  );
};

// deletes an item from db
export const deleteItem = async (id) => {
  console.log("about to delete");
  await db.result("DELETE FROM items WHERE id = $1", [id]);
  console.log("result done");
};

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({
      path: "../.env",
    });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }

  return pgp()(connection);
}