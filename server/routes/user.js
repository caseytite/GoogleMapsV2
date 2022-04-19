const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

module.exports = (db) => {
  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const hash = bcrypt.hashSync(password, salt);
    const salt = bcrypt.genSaltSync(10);

    db.query(
      `SELECT * FROM users
      WHERE email = $1`,
      [email]
    )
      .then((data) => {
        console.log(
          "match",
          bcrypt.compareSync(data.rows[0].password, password)
        );

        console.log("db pass", data.rows[0].password);
        console.log("hash login", hash);

        if (bcrypt.compareSync(data.rows[0].password, hash)) {
          const user = data.rows;
          req.session.id = user[0].id;
          res.json({
            data: data.rows,
            user: user[0],
          });
        }
      })
      .catch((err) => res.json({ error: err.message }));
  });
  router.get("/", (req, res) => {
    db.query(
      `SELECT * FROM users
      WHERE users.id = $1`,
      [req.session.id]
    )
      .then((data) => {
        res.json({
          data: data.rows,
        });
      })
      .catch((err) => res.json({ error: err.message }));
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  router.post("/register", (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log("hashed p", hash);
    db.query(
      `INSERT INTO users (first_name,last_name,email,password)
      VALUES ($1,$2,$3,$4) RETURNING *`,
      [
        req.body.firstName,
        req.body.lastName,
        req.body.email.toLowerCase(),
        hash,
      ]
    ).then((data) => {
      res.json(data.rows);
    });
  });

  return router;
};
