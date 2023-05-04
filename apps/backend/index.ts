import bodyParser from "body-parser";
import express from "express";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { verbose } from "sqlite3";

import { BackendStatusCodes } from "./types";
import { catalogData, storageData } from "./utils";

const sqlite3 = verbose();

const db = new sqlite3.Database("users");

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  if (req.headers["user-agent"]?.includes("Mozilla")) {
    console.log("Looks like a test from a browser.");
  } else {
    console.log("Client APP test OK!");
  }

  return res.status(200).json({ status: BackendStatusCodes.OK });
});

// TODO: Good case for simple middleware to check of the data dir exists.
app.post("/backupCatalog", (req, res) => {
  console.log(`New catalog backup ${new Date().toLocaleDateString()}`);

  if (!existsSync(resolve("./data"))) mkdirSync(resolve("./data"));

  writeFileSync(
    resolve(
      "./data",
      `${req.body.user} - ${Date.now().toString()}-catalogData.json`
    ),
    JSON.stringify(req.body.data)
  );

  return res.status(200).json({});
});

// TODO: Good case for simple middleware to check of the data dir exists.
app.post("/backupStorage", (req, res) => {
  console.log(`New storage backup ${new Date().toLocaleDateString()}`);

  if (!existsSync(resolve("./data"))) mkdirSync(resolve("./data"));

  writeFileSync(
    resolve(
      "./data",
      `${req.body.user} - ${Date.now().toString()}-storageData.json`
    ),
    JSON.stringify(req.body.data)
  );

  return res.status(200).json({});
});

app.get("/seedCatalog", (_, res) => {
  res.status(200).json({ data: catalogData });
});

app.get("/seedStorage", (_, res) => {
  res.status(200).json({
    data: storageData.map((item) => [...item, Date.now().toString()]),
  });
});

app.post("/verifyUser", (req, res) => {
  console.log(req.body);

  res.status(200).json({});
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on port ${PORT}...`);
});
