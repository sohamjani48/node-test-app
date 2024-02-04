const mongoDb = require("mongodb");
const getDb = require("../../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = new mongoDb.ObjectId(id);
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      //update the project
      //To update the existing document in MongoDB we use $set tp set the updated value
      dbOp = db
        .collection("products")
        .updateOne({ _id: new mongoDb.ObjectId(this._id) }, { $set: this });
    } else {
      //we already have the database connection, so in MongoDB we will use collection
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();

    //find doesn't immediately return a promise
    // It returns a cursor - A cursor is an object provided by monogDB to ge through documents step by step.
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(typeof products, products);
        return products;
      })
      .catch((err) => console.log(err));
  }

  static findById(prodId) {
    const db = getDb();
    //In find method we can prodvide an object that will return return the objects in DB which matches the condition
    return db
      .collection("products")
      .find({ _id: new mongoDb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log("one product", product);
        return product;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
