import express from "express";
import mime from "mime-types";

import * as db from "./db.mjs";

const app = express();
const port = process.env.PORT || 4000;

// items defines the routes
const items = express.Router();

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
  // for future: const { name, dueDate } = request.body; // for multiple inputs
  // console.log(request.body); // to test
  const item = await db.addItem(name);
  response.status(201).json(item);
  // alternatively: response.json(newItem.rows[0]);
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

app.use("/api/items", items);

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
