const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

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
  }
});

module.exports = router;
