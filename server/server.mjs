import express from "express";
import mime from "mime-types";

import * as db from "./db.mjs";

const app = express();
const port = process.env.PORT || 4000;

// router instance for lists
const lists = express.Router();
// items defines the routes
const items = express.Router();

// gets all lists
lists.get("/", async (request, response) => {
  const lists = await db.getLists();
  response.status(200).json(lists);
});

// gets one list
lists.get("/:id", async (request, response) => {
  const { id } = request.params;
  const list = await db.getList(id);
  // response.json(items.rows[0]);
  response.status(200).json(list);
});

lists.use(express.json());

// adds an list
lists.post("/", async (request, response) => {
  const payload = request.body;
  const list = await db.addList(payload);
  response.status(201).json(list);
  // alternatively: response.json(newItem.rows[0]);
  console.log("i'm in post and item is: ", list); // to test
});

// edits a list
lists.put("/:id", async (request, response) => {
  const list = request.body;
  await db.updateList(list);
  response.status(201);
  response.json("List was updated");
});

// http req to delete a list based on id
lists.delete("/:id", async (request, response) => {
  const { id } = request.params;
  await db.deleteList(id);
  console.log("in delete", request.params);
  response.status(200);
});

// gets all items
items.get("/", async (request, response) => {
  const items = await db.getItems();
  console.log("hello test test");
  response.status(200).json(items);
});

// gets one item
items.get("/:id", async (request, response) => {
  const { id } = request.params;
  const item = await db.getItem(id);
  // response.json(items.rows[0]);
  response.status(200).json(item);
});

items.use(express.json());

// adds an item
items.post("/", async (request, response) => {
  const { name } = request.body;
  const item = await db.addItem(name);
  response.status(201).json(item);
  // alternatively: response.json(newItem.rows[0]);
  console.log("i'm in post and item is: ", item); // to test
});

// write get, put, post, delete routes here with items.

// edits an item
items.put("/:id", async (request, response) => {
  const item = request.body;
  await db.updateItem(item);
  response.status(201);
  response.json("Item was updated");
});

// http req to delete an item based on id
items.delete("/:id", async (request, response) => {
  const { id } = request.params;
  await db.deleteItem(id);
  console.log("in delete", request.params);
  response.status(200);
});

app.use("/api/lists", lists);
app.use("/api/items", items);

app.use(express.static("public"));

process.env?.SERVE_REACT?.toLowerCase() === "true" &&
  app.use(
    express.static("/app", {
      maxAge: "1d",
      setHeaders: (res, path) =>
        ["application/json", "text/html"].includes(mime.lookup(path)) &&
        res.setHeader("Cache-Control", "public, max-age=0"),
    }),
  );

app.get("/api/ping", (request, response) =>
  response.json({ response: "pong" }),
);

app.listen(port, () => {
  console.info(`Example server listening at http://localhost:${port}`);
});
