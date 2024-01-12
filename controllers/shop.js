const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  // res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      docTitle: "All Products",
      path: "/products",
      pageTitle: "My Shop",
    });
  });
};

exports.getProductById = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId, (product) => {
    res.render("shop/product-detail.ejs", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  // res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      path: "/",
      pageTitle: "My Shop",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart?.products?.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            productQty: cartProductData.qty,
          });
        }
        console.log("logxx cartProducts:", cartProducts);
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(product.id, product.price);
  });
  res.redirect("/cart");
};

exports.getCheckouut = (req, res, next) => {
  res.render("shop/checkout", { path: "/checkout", pageTitle: "Checkout" });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { path: "/orders", pageTitle: "Your Orders" });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("logxx prod id is", prodId);
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};
