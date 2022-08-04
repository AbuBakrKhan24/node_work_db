const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

// Get All orders
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM orders", (err, result) => {
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
  const { user_id, amount, shipping_address, order_email, order_status } =
    req.body;
  const order_date = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    con.query(
      `INSERT into orders (user_id,amount,shipping_address, order_email,order_date,order_status) values ( "${user_id}", "${amount}", "${shipping_address}", "${order_email}", "${order_date}", "${order_status}")`,
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
      `SELECT * FROM orders WHERE order_id = ${req.params.id}`,
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
      `DELETE FROM orders WHERE order_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send("Sucessfully deleted this order");
      }
    );
    // res.send({ id: req.params.id });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Update a order
router.put("/:id", (req, res) => {
  const { user_id, amount, shipping_address, order_email, order_status } =
    req.body;

  try {
    con.query(
      `UPDATE orders SET user_id = "${user_id}", amount = "${amount}", shipping_address = "${shipping_address}", order_email = "${order_email}", order_status = "${order_status}" WHERE order_id = "${req.params.id}" `,
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

module.exports = router;
