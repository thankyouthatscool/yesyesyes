import express from "express";

import { BackendStatusCodes } from "./types";

const app = express();

app.get("/", (_, res) => {
  console.log("EEE");

  return res.status(200).json({ status: BackendStatusCodes.OK });
});

app.post("/catalogBackup", (req, res) => {
  console.log("eee");

  console.log(req.body);

  return res.status(200).json({ status: BackendStatusCodes.OK });
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server is listening on port 5000...");
});
