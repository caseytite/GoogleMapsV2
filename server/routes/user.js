const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

module.exports = (db) => {
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email === "casey@email.com" || email === "owen@email.com") {
      db.query(
        `SELECT * FROM users
            WHERE email = $1 AND password = $2`,
        [email.toLowerCase(), password]
      )
        .then((data) => {
          const user = data.rows;
          req.session.id = user[0].id;
          res.json({
            data: data.rows,
            user: user[0],
          });
        })
        .catch((e) =>
          res.json({
            error: "incorrect password",
          })
        );
    } else {
      db.query(
        `SELECT * FROM users
        WHERE email = $1 `,
        [email.toLowerCase()]
      )
        .then((data) => {
          if (data) {
            const validPassword = bcrypt.compareSync(
              password,
              data.rows[0].password
            );
            if (validPassword) {
              const validUser = data.rows;
              req.session.id = validUser[0].id;
              res.json({
                data: data.rows,
                user: validUser[0],
              });
            } else {
              res.json({
                error: "incorrect password",
              });
            }
          }
        })
        .catch((e) =>
          res.json({
            error: "incorrect password",
          })
        );
    }
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
    const { email, password, firstName, lastName } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    db.query(
      `INSERT INTO users (first_name,last_name,email,password)
      VALUES ($1,$2,$3,$4) RETURNING *`,
      [firstName, lastName, email.toLowerCase(), hash]
    ).then((data) => {
      res.json(data.rows);
    });
  });

  return router;
};
