import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

// gets all items from items
export const getItems = async () => await db.any("SELECT * FROM items");

// gets an item
export const getItem = async (id) =>
  await db.any("SELECT * FROM items WHERE id = $1", [id]);

// adds a created item to items db
export const addItem = async (name) =>
  await db.any("INSERT INTO items(name) VALUES($1) RETURNING *", [name]);

// update an item
export const updateItem = async (name, id) =>
  await db.any("UPDATE items SET name = $1 WHERE id = $2", [name, id]);

// deletes an item from db
export const deleteItem = async (id) =>
  await db.result("DELETE FROM items WHERE id = $1", [id]);

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
