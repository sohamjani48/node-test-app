const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);

const MONGODB_URI =
  "mongodb+srv://soham:srj13579@myfirstcluster.virlawt.mongodb.net/shop?retryWrites=true&w=majority";

const app = express();
const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const authRoutes = require("./routes/auth.js");
const errorController = require("./controllers/errors.js");
const User = require("./models/mongoDbModels/user.js");

//setup for MongoDB
// const mongoConnect = require("./util/database.js").mongoConnect;

app.use(bodyParser.urlencoded());

// This app.js has mongodb setup

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
); //resave false will not change the session on every request

app.use((req, res, next) => {
  if (req.session.user) {
    User.findById(req.session.user._id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => console.log(err));
  } else {
    return next();
  }
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
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