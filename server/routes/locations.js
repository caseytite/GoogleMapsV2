const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT * FROM locations
      WHERE user_id = $1;`,
      [req.session.id]
    ).then((data) => {
      console.log("pins", data.rows);
      res.json(data.rows);
    });
  });

  router.post("/", (req, res) => {
    db.query(
      `INSERT INTO locations (user_id,time,description,lat,lng,title,tags)
      VALUES ($1,now(),$2,$3,$4,$5,$6) RETURNING *`,
      [
        req.session.id,
        req.body.description,
        req.body.lat.toString(),
        req.body.lng.toString(),
        req.body.title,
        req.body.tags,
      ]
    ).then((data) => {
      console.log("data", data.rows);
    });
  });

  return router;
};
