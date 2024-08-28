"use strict";

const express = require("express");
const dotenv = require("dotenv");
const writeRead = require("./routes/books");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3306;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", writeRead);

app.use("/", function (req, res, next) {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
