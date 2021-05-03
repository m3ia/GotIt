import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getItems = async () => await db.any("SELECT * FROM items");

export const addItem = async (name) =>
  (
    await db.any("INSERT INTO items(name) VALUES($1) RETURNING id, name", [
      name,
    ])
  )[0];

export const deleteItem = async (id) =>
  await db.query("DELETE FROM items WHERE id = $1", [id]);

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
