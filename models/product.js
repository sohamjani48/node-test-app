const db = require("../util/database");
const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      "INSERT INTO products (id, title, price, imageUrl, description) VALUES (?, ?, ?, ?, ?)",
      [this.id, this.title, this.price, this.imageUrl, this.description]
    );
  }

  //By using static keyword, we can call method on Product class rather than creating an instance of Product
  //Becuase of static, we don't need to create a dummy object to call this fetchAll function like this, const prod = new Product('book1'); prod.fetchAll().
  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }

  static deleteById(id) {}
};
