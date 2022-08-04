const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const middleware = require("../middleware/auth");

// Get All Products
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM products", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Adding Product
router.post("/", (req, res) => {
  const {
    sku,
    name,
    price,
    weight,
    descriptions,
    thumbnail,
    image,
    category,
    stock,
  } = req.body;
  const create_date = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    con.query(
      `INSERT into products (sku,name,price, weight,descriptions,thumbnail,image,category,create_date,stock) values ( "${sku}", "${name}", "${price}", "${weight}", "${descriptions}", "${thumbnail}", "${image}", "${category}", "${create_date}", "${stock}" )`,
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

// Gets one product
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM products WHERE product_id = ${req.params.id}`,
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

// Delete one product
router.delete("/:id", middleware, (req, res) => {
  if (req.user.user_type === "admin") {
    try {
      con.query(
        `DELETE FROM products WHERE product_id = ${req.params.id}`,
        (err, result) => {
          if (err) throw err;
          res.send("Sucessfully deleted this product");
        }
      );
      // res.send({ id: req.params.id });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  } else {
    res.send("You are not an admin");
  }
});

// Update a product
router.put("/:id", middleware, (req, res) => {
  if (req.user.user_type === "admin") {
    const {
      sku,
      name,
      price,
      weight,
      descriptions,
      thumbnail,
      image,
      category,
      stock,
    } = req.body;

    try {
      con.query(
        `UPDATE products SET sku = "${sku}", name = "${name}", price = "${price}", weight = "${weight}", descriptions = "${descriptions}", thumbnail = "${thumbnail}", image = "${image}", category = "${category}", stock = "${stock}" WHERE product_id = "${req.params.id}" `,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  } else {
    res.send("You are not an admin");
  }
});

module.exports = router;
