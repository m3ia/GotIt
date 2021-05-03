import express from "express";
import mime from "mime-types";

import * as db from "./db.mjs";

const app = express();
const port = process.env.PORT || 4000;

// items defines the routes
const items = express.Router();

items.get("/", async (request, response) => {
  const items = await db.getItems();
  response.json(items);
});

items.use(express.json());

items.post("/", async (request, response) => {
  const { name } = request.body;
  // const { name, dueDate } = request.body; // for multiple inputs
  // console.log(request.body); // to test 
  const item = await db.addItem(name);
  response.status(201).json(item);
});
// write get, put, post, delete routes here with items.
items.delete("/:id", async (request, response) => {
  const { id } = request.params;
  await db.deleteItem(id);
  response.status(201);
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
