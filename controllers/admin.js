const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/edit-product", {
    pageTitle: "Add Product Page",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res) => {
  console.log(req.body);
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  const editMode = req.query.edit;
  const prodId = req.params.productId;

  if (!editMode) {
    res.redirect("/");
  }
  Product.findById(prodId, (product) => {
    if (!product) return res.redirect("/");

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      path: "/admin/products",
      pageTitle: "Admin Products",
    });
  });
};

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect("/admin/products");
};
