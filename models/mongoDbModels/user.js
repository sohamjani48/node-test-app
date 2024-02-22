const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          //setting up relations
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

//We can user methods in schema to add out own created functions to the Schema
userSchema.methods.addToCart = function (product) {
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  const cartProductIndex = this.cart.items.findIndex(
    (cartProd) => cartProd.productId.toString() === product._id.toString()
  );

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  const updatedCart = {
    items: updatedCartItems,
  };

  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.deleteItemFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter(
    (prod) => prod.productId.toString() !== productId.toString()
  );
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);

// const mongoDb = require("mongodb");
// const getDb = require("../../util/database").getDb;

// const ObjectId = mongoDb.ObjectId;

// class User {
//   constructor(username, email, id, cart) {
//     this.username = username;
//     this.email = email;
//     this.id = id;
//     this.cart = cart; // { items: []}
//   }

//   save() {
//     const db = getDb();
//     return db.collection("users").insertOne(this);
//   }

//   addToCart(product) {
//     const db = getDb();
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     const cartProductIndex = this.cart.items.findIndex(
//       (cartProd) => cartProd.productId.toString() === product._id.toString()
//     );

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         productId: new ObjectId(product._id),
//         quantity: newQuantity,
//       });
//     }

//     const updatedCart = {
//       items: updatedCartItems,
//     };

//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new ObjectId(this.id) },
//         { $set: { cart: updatedCart } }
//       );
//   }

//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map((prod) => prod.productId);
//     //To find multiple documents in mongoDB we use $in operator which takes array as argument
//     return db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         return products.map((p) => {
//           return {
//             ...p,
//             quantity: this.cart.items.find(
//               (i) => i.productId.toString() === p._id.toString()
//             ).quantity,
//           };
//         });
//       });
//   }

//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter(
//       (prod) => prod.productId.toString() !== productId.toString()
//     );

//     console.log("logxx updated cart items", updatedCartItems);

//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new ObjectId(this.id) },
//         { $set: { cart: { items: updatedCartItems } } }
//       );
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then((products) => {
//         const order = {
//           //here we don't need to update the [rice in orders if some price of a product changed, because when user ordered the product the price may be different
//           items: products,
//           user: {
//             _id: new ObjectId(this.id),
//             name: this.name,
//           },
//         };

//         return db.collection("orders").insertOne(order);
//       })
//       .then((result) => {
//         this.cart = { items: [] };
//         return db
//           .collection("users")
//           .updateOne(
//             { _id: new ObjectId(this.id) },
//             { $set: { cart: { items: [] } } }
//           );
//       })
//       .catch((err) => console.log(err));
//   }

//   getOrders() {
//     const db = getDb();

//     return db
//       .collection("orders")
//       .find({ "user._id": new ObjectId(this.id) })
//       .toArray();
//   }

//   static findById(userId) {
//     const db = getDb();
//     //find will return a cursor and to get the first element we use next metho
//     // return db.collection("users").findOne({ _id: new ObjectId(userId) }).next();

//     return db
//       .collection("users")
//       .findOne({ _id: new ObjectId(userId) })
//       .then((user) => {
//         return user;
//       })
//       .catch((err) => console.log(err));
//   }
// }

// module.exports = User;
