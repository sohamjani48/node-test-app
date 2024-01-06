const express = require("express");
const path = require("path");

const router = express.Router();
const adminData = require("./admin");

router.get("/", (req, res, next) => {
  const { products } = adminData;
  // res.sendFile(path.join(__dirname, "..", "views", "shop.html"));

  res.render("shop", {
    prods: products,
    docTitle: "Shop",
    path: "/",
    pageTitle: "My Shop",
  });
});

module.exports = router;
