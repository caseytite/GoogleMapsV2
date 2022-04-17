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
  console.log("the get");
  db.query(
    `SELECT * FROM locations 
    WHERE user_id = $1;`,
    [1]
  ).then((data) => res.json(data.rows));
});

app.post("/user", (req, res) => {
  console.log("the posts");
  console.log(req.body);

  db.query(
    `INSERT INTO locations (user_id,time,description,lat,lng,title,tags)
    VALUES ($1,now(),$2,$3,$4,$5,$6) RETURNING *`,
    [
      1,
      req.body.description,
      req.body.lat.toString(),
      req.body.lng.toString(),
      "pizza",
      "pizza",
    ]
  ).then((data) => {
    console.log("data", data.rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
