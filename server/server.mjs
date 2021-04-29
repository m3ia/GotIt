import express from "express";
import mime from "mime-types";

import * as db from "./db.mjs";

const app = express();
const port = process.env.PORT || 4000;

// tasks defines the routes
const tasks = express.Router();

tasks.get("/", async (request, response) => {
  const tasks = await db.getTasks();
  response.json(tasks);
});

tasks.use(express.json());

tasks.post("/", async (request, response) => {
  const { name } = request.body;
  // const { name, dueDate } = request.body; // for multiple inputs
  // console.log(request.body); // to test 
  const task = await db.addTask(name);
  response.status(201).json(task);
});
// write get, put, post, delete routes here with tasks.
tasks.delete("/:id", async (request, response) => {
  const { id } = request.params;
  await db.deleteTask(id);
  response.status(201);
});

app.use("/api/tasks", tasks);

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
