const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("add-product", {
    pageTitle: "Add Product Page",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res) => {
  console.log(req.body);
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  // res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
  Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      docTitle: "Shop",
      path: "/",
      pageTitle: "My Shop",
    });
  });
};
