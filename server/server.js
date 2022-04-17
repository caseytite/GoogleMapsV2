require("dotenv").config();

const PORT = 3009; // Client will be 3000
const express = require("express");

// middleware
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

// database
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["chicken", "horse", "cat"],
  })
);

app.get("/user", (req, res) => {
  db.query(
    `SELECT * FROM users 
    JOIN locations on users.id = user_id 
    WHERE users.id = $1;`,
    [1]
  ).then((data) => res.json(data.rows));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
