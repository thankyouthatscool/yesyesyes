import { writeFileSync } from "fs";
import { resolve } from "path";
import bodyParser from "body-parser";
import express from "express";

import { BackendStatusCodes } from "./types";

const app = express();
app.use(bodyParser.json());

app.get("/", (_, res) => {
  console.log("EEE");

  return res.status(200).json({ status: BackendStatusCodes.OK });
});

app.post("/catalogBackup", (req, res) => {
  console.log(JSON.stringify(req.body).length);

  writeFileSync(
    resolve("./data", `${Date.now().toString()}-catalogData.txt`),
    JSON.stringify(req.body)
  );

  return res.status(200).json({});
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server is listening on port 5000...");
});
