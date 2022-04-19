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
    keys: ["sic mundus creatus est", " and thus the world was created"],
  })
);

const userRoutes = require("./routes/user");
app.use("/user", userRoutes(db));

const locationRoutes = require("./routes/locations");
app.use("/locations", locationRoutes(db));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
