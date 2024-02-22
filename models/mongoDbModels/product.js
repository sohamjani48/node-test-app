const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//to create product schema
//eventhough we define schema, we can also deviate from the schema
const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

//using model, we connect the schema to a name
module.exports = mongoose.model("Product", productSchema);

// const mongoDb = require("mongodb");
// const getDb = require("../../util/database").getDb;

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongoDb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       //update the project
//       //To update the existing document in MongoDB we use $set tp set the updated value
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       //we already have the database connection, so in MongoDB we will use collection
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => console.log(err));
//   }

//   static fetchAll() {
//     const db = getDb();

//     //find doesn't immediately return a promise
//     // It returns a cursor - A cursor is an object provided by monogDB to go through documents step by step.
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log(typeof products, products);
//         return products;
//       })
//       .catch((err) => console.log(err));
//   }

//   static findById(prodId) {
//     const db = getDb();
//     //In find method we can prodvide an object that will return return the objects in DB which matches the condition
//     return db
//       .collection("products")
//       .find({ _id: new mongoDb.ObjectId(prodId) })
//       .next()
//       .then((product) => {
//         return product;
//       })
//       .catch((err) => console.log(err));
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongoDb.ObjectId(prodId) });
//   }
// }

// module.exports = Product;
