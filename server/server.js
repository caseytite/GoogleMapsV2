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
    `SELECT * FROM locations
    join users on users.id = user_id 
    WHERE user_id = $1;`,
    [req.session.id]
  ).then((data) => res.json(data.rows));
});

app.post("/user", (req, res) => {
  db.query(
    `INSERT INTO locations (user_id,time,description,lat,lng,title,tags)
    VALUES ($1,now(),$2,$3,$4,$5,$6) RETURNING *`,
    [
      req.session.id,
      req.body.description,
      req.body.lat.toString(),
      req.body.lng.toString(),
      req.body.title,
      "pizza",
    ]
  ).then((data) => {
    console.log("data", data.rows);
  });
});

app.post("/login", (req, res) => {
  db.query(
    `SELECT * FROM users
    WHERE email = $1
    AND password = $2`,
    [req.body.email, req.body.password]
  )
    .then((data) => {
      const user = data.rows;
      req.session.id = user[0].id;
      res.json({
        data: data.rows,
        user: user[0],
      });
    })
    .catch((err) => res.json({ error: err.message }));
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
