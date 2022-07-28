const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

// Get All orders
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM categories", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Adding order
router.post("/", (req, res) => {
  const { name, description, thumbnail } = req.body;
  //   const order_date = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    con.query(
      `INSERT into categories (name, description, thumbnail) values ( "${name}", "${description}", "${thumbnail}")`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Update a order
router.put("/:id", (req, res) => {
  const { name, description, thumbnail } = req.body;

  try {
    con.query(
      `UPDATE categories SET  name = "${name}", description = "${description}", thumbnail = "${thumbnail}" WHERE category_id = "${req.params.id}" `,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Gets one order
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM categories WHERE category_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
    // res.send({ id: req.params.id });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Delete one order
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM categories WHERE category_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send("Sucessfully deleted this category");
      }
    );
    // res.send({ id: req.params.id });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
