import express from "express";
import { OAuth2Client } from "google-auth-library";
import mime from "mime-types";
const client = new OAuth2Client(process.env.REACT_APP_GCAL_CLIENT_ID);

import * as db from "./db.mjs";

const app = express();
app.use(express.json());

const port = process.env.PORT || 4000;

// router instance for lists
const lists = express.Router();
// items defines the routes
const items = express.Router();
// router instance for users
const users = express.Router();

app.post("/api/v1/auth/google", async (req, res) => {
  const { token } = req.body;
  console.log("We got a token", token);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { email } = ticket.getPayload();
  console.log("We got the user verified email", email);
  let { user } = await db.loginUser(email);
  if (!user) {
    user = await db.getUser(email);
  }
  console.log("we got em", { user });
  res.status(201);
  res.json(user);
});

// gets all users
users.get("/", async (request, response) => {
  const users = await db.getUsers();
  response.status(200).json(users);
});

// gets one user
users.get("/:id", async (request, response) => {
  const { id } = request.params;
  const user = await db.getUser(id);
  response.status(200).json(user);
});

users.use(express.json());

// adds an user
users.post("/", async (request, response) => {
  const payload = request.body;
  const user = await db.addUser(payload);
  response.status(201).json(user);
  // alternatively: response.json(newItem.rows[0]);
});

// edits a user
users.put("/:id", async (request, response) => {
  const user = request.body;
  await db.updateUser(user);
  response.status(201);
  response.json("User was updated");
});

// http req to delete a user based on id
users.delete("/:id", async (request, response) => {
  const { id } = request.params;
  await db.deleteUser(id);
  response.status(200).json("user deleted");
});

// gets all lists
lists.get("/", async (request, response) => {
  console.log(request.query);
  const { userId } = request.query;
  console.log("got a user", userId);
  const lists = await db.getLists(userId);
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
  response.status(200).json("list deleted");
});

// gets all items
items.get("/", async (request, response) => {
  const { listId } = request.query;
  const items = await db.getItems(listId);
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
  const { name, list_id } = request.body;
  const item = await db.addItem(name, list_id);
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
  response.status(200).json("item was deleted");
});

app.use("/api/lists", lists);
app.use("/api/items", items);
app.use("/api/users", users);

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
