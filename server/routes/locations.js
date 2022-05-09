const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT * FROM locations
      WHERE user_id = $1
      OR isPublic = true
      ;`,
      [req.session.id]
    ).then((data) => {
      res.json(data.rows);
    });
  });

  router.post("/", (req, res) => {
    db.query(
      `INSERT INTO locations (user_id,time,lat,lng)
      VALUES ($1,now(),$2,$3) RETURNING *`,
      [req.session.id, req.body.lat.toString(), req.body.lng.toString()]
    ).then((data) => {
      // console.log("data", data.rows);
      res.json(data.rows);
    });
  });

  router.put("/:id", (req, res) => {
    db.query(
      `UPDATE locations
        SET(title,description,tags) = ($1,$2,$3)
        WHERE id = $4 RETURNING *;
        `,
      [req.body.title, req.body.description, req.body.tags, req.params.id]
    ).then((data) => {
      res.json(data.rows);
    });
  });

  router.patch("/rating/:id", (req, res) => {
    db.query(
      `UPDATE locations
        SET(rating,numberofratings) = ((SELECT rating from locations WHERE id = $2)+ $1,(SELECT numberofratings from locations WHERE id = $2)+1)
        WHERE id = $2 RETURNING *;
        `,
      [+req.body.rate, req.params.id]
    )
      .then((data) => {
        res.json(data.rows);
      })
      .catch((e) => console.log(e.message));
  });

  router.patch("/:id", (req, res) => {
    db.query(
      `SELECT * FROM locations
    WHERE id = $1  
    ;`,
      [req.params.id]
    ).then((data) => {
      const public = data.rows[0].ispublic;

      db.query(
        `UPDATE locations
      SET isPublic = $1
      WHERE id = $2 RETURNING *;
      `,
        [!public, req.params.id]
      ).then((data) => {
        res.json(data.rows);
      });
    });
  });

  router.delete("/:id", (req, res) => {
    db.query(
      `
      DELETE FROM locations
      WHERE id = $1
      `,
      [req.params.id]
    ).then(() => {
      db.query(
        `SELECT * FROM locations
        WHERE user_id = $1;`,
        [req.session.id]
      ).then((data) => {
        res.json(data.rows);
      });
    });
  });

  return router;
};
