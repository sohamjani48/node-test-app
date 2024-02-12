const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const errorController = require("./controllers/errors.js");
const User = require("./models/mongoDbModels/user.js");

//setup for MongoDB
const mongoConnect = require("./util/database.js").mongoConnect;

app.use(bodyParser.urlencoded());

// This app.js has mongodb setup

app.use((req, res, next) => {
  User.findById("65c7a969485640284033a98d")
    .then((user) => {
      req.user = new User(user.name, user.email, user._id, user.cart);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(4000);
})