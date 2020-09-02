const express = require("express");
const cors = require("cors");
const { sendMail } = require("../service/smtp");
const env = require("dotenv").config();

var app = express();

// enable CORS
app.use(cors());
app.options("/*", function (req, res) {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.sendStatus(200);
});
app.options("/smtp/send-mail", (req, res) => {
  res.sendStatus(204);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Routes * //
app.post("/smtp/send-mail", (req, res) => {
  sendMail(req, res);
});

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendStatus(200);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
