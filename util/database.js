//Setup for Sequelize
// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("node-complete", "root", "Srj@13579", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;

//mongoDB connection
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  //connect function takes URL which is the SRV address given in Project
  MongoClient.connect(
    "mongodb+srv://soham:srj13579@myfirstcluster.virlawt.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("logxx connected");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw "No Database Found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
