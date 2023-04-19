import { writeFileSync } from "fs";
import { resolve } from "path";
import bodyParser from "body-parser";
import express from "express";

import { BackendStatusCodes } from "./types";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

const app = express();

app.use(bodyParser.json());

app.get("/", (_, res) => {
  return res.status(200).json({ status: BackendStatusCodes.OK });
});

app.post("/catalogBackup", (req, res) => {
  console.log(JSON.stringify(req.body).length);

  writeFileSync(
    resolve("./data", `${Date.now().toString()}-catalogData.json`),
    JSON.stringify(req.body)
  );

  return res.status(200).json({});
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on port ${PORT}...`);
});
