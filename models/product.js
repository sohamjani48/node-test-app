const fs = require("fs");
const path = require("path");

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
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log("logxx error occured", err);
      });
    });
  }

  //By using static keyword, we can call method on Product class rather than creating an instance of Product
  //Becuase of static, we don't need to create a dummy object to call this fetchAll function like this, const prod = new Product('book1'); prod.fetchAll().
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
