import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

// gets all active items from items.
// TODO: change getItems to getActiveItems
export const getItems = async () =>
  await db.any("SELECT * FROM items ORDER BY id");

// gets an item
export const getItem = async (id) =>
  await db.any("SELECT * FROM items WHERE id = $1", [id]);

// adds a created item to items db
export const addItem = async (name) =>
  await db.any("INSERT INTO items (name) VALUES ($1) RETURNING *", [name]);

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
}
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
