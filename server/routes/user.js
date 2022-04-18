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

  return router;
};
