const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/login", (req, res) => {
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

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  router.post("/register", (req, res) => {
    console.log(req.body);
    db.query(
      `INSERT INTO users (first_name,last_name,email,password)
      VALUES ($1,$2,$3,$4) RETURNING *`,
      [
        req.body.firstName,
        req.body.lastName,
        req.body.email.toLowerCase(),
        req.body.password,
      ]
    ).then((data) => {
      res.json(data.rows);
      console.log("data", data.rows);
    });
  });

  return router;
};
