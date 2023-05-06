import bodyParser from "body-parser";
import express from "express";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  unlinkSync,
  writeFileSync,
} from "fs";
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
// TODO: Delete old backups?
app.post("/backupCatalog", (req, res) => {
  console.log(`New catalog backup ${new Date().toLocaleDateString()}.`);

  if (!existsSync(resolve("./data"))) mkdirSync(resolve("./data"));

  writeFileSync(
    resolve(
      "./data",
      `${req.body.user}-${Date.now().toString()}-catalogData.json`
    ),
    JSON.stringify(req.body.data)
  );

  return res.status(200).json({});
});

// TODO: Good case for simple middleware to check of the data dir exists.
// TODO: Delete old backups?
app.post("/backupStorage", (req, res) => {
  console.log(`New storage backup ${new Date().toLocaleDateString()}.`);

  if (!existsSync(resolve("./data"))) mkdirSync(resolve("./data"));

  writeFileSync(
    resolve(
      "./data",
      `${req.body.user}-${Date.now().toString()}-storageData.json`
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
  res.status(200).json({});
});

app.post("/checkBackups", (req, res) => {
  if (!existsSync(resolve("./data"))) mkdirSync(resolve("./data"));

  const dataDirContent = readdirSync(resolve("./data"));

  const requestedUserBackups = dataDirContent
    .map((item) => {
      const data = item.split("-").map((item) => item.trim());

      return {
        userId: data[0],
        dateCreated: data[1],
        type: data[2].toLowerCase().includes("storage") ? "storage" : "catalog",
      };
    })
    .filter(({ userId }) => userId === req.body.userId);

  res.status(200).json({
    latestCatalogBackup: requestedUserBackups
      .filter((backup) => backup.type === "catalog")
      .sort(({ dateCreated }) =>
        parseFloat(dateCreated) < parseFloat(dateCreated) ? 1 : -1
      )[0]?.dateCreated,
    latestStorageBackup: requestedUserBackups
      .filter((backup) => backup.type === "storage")
      .sort(({ dateCreated }) =>
        parseFloat(dateCreated) < parseFloat(dateCreated) ? 1 : -1
      )[0]?.dateCreated,
    numberOfBackups: {
      catalog: requestedUserBackups.filter(
        (backup) => backup.type === "catalog"
      ).length,
      storage: requestedUserBackups.filter(
        (backup) => backup.type === "storage"
      ).length,
    },
  });
});

app.post("/pruneOldBackups", (req, res) => {
  if (!existsSync(resolve("./data"))) mkdirSync(resolve("./data"));

  const dataDirContent = readdirSync(resolve("./data"));

  const requestedUserBackups = dataDirContent
    .map((item) => {
      const data = item.split("-").map((item) => item.trim());

      return {
        fileName: item,
        userId: data[0],
        dateCreated: data[1],
        type: data[2].toLowerCase().includes("storage") ? "storage" : "catalog",
      };
    })
    .filter(({ userId }) => userId === req.body.userId);

  const catalogBackups = requestedUserBackups.filter(
    ({ type }) => type === "catalog"
  );
  const storageBackups = requestedUserBackups.filter(
    ({ type }) => type === "storage"
  );

  const [latestCatalogBackup, ...restCatalog] = catalogBackups.sort((a, b) =>
    parseFloat(a.dateCreated) > parseFloat(b.dateCreated) ? -1 : 1
  );

  const [latestStorageBackup, ...restStorage] = storageBackups.sort((a, b) =>
    parseFloat(a.dateCreated) > parseFloat(b.dateCreated) ? -1 : 1
  );

  restCatalog.forEach((file) => unlinkSync(resolve("./data", file.fileName)));
  restStorage.forEach((file) => unlinkSync(resolve("./data", file.fileName)));

  res.status(200).json({
    latestCatalogBackup: latestCatalogBackup?.dateCreated,
    latestStorageBackup: latestStorageBackup?.dateCreated,
    numberOfBackups: { catalog: 1, storage: 1 },
  });
});

app.post("/syncCatalogData", (req, res) => {
  console.log(req.body.userId);

  res.status(200).json({});
});

app.post("/syncStorageData", (req, res) => {
  console.log(req.body.userId);

  res.status(200).json({});
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on port ${PORT}...`);
});
