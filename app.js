const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const errorController = require("./controllers/errors.js");
const User = require("./models/mongoDbModels/user.js");

//setup for MongoDB
// const mongoConnect = require("./util/database.js").mongoConnect;

app.use(bodyParser.urlencoded());

// This app.js has mongodb setup

app.use((req, res, next) => {
  User.findById("65d23ee7cbfb1aa906f2eb86")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://soham:srj13579@myfirstcluster.virlawt.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Soham",
          email: "soham1@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    console.log("logxx connected to mongoDB");

    app.listen(4000);
  })
  .catch((err) => console.log(err));