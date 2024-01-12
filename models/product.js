const fs = require("fs");
const path = require("path");
const Cart = require("./cart");

const filePath = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save(id) {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (p) => p.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
          console.log("logxx error occured", err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(filePath, JSON.stringify(products), (err) => {
          console.log("logxx error occured", err);
        });
      }
    });
  }

  //By using static keyword, we can call method on Product class rather than creating an instance of Product
  //Becuase of static, we don't need to create a dummy object to call this fetchAll function like this, const prod = new Product('book1'); prod.fetchAll().
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      cb(product);
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      const updatedProducts = products.filter((p) => p.id !== id);
      fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }

        console.log("logxx error occured while deleting data from file", err);
      });
    });
  }
};
