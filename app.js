const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const csurf = require("csurf");
const flash = require("connect-flash");

const MONGODB_URI =
  "mongodb+srv://soham:srj13579@myfirstcluster.virlawt.mongodb.net/shop?retryWrites=true&w=majority";

const app = express();
const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
const csurfProtection = csurf();

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

//after creating the session, we will add the csurf protection
app.use(csurfProtection);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));

//middle ware to send some props like authentication and csrf token to every view
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (req.session.user) {
    User.findById(req.session.user._id)
      .then((user) => {
        if (!user) {
          return next();
        }
        req.user = user;
        next();
      })
      .catch((err) => {
        //Inside of then/catch throw error doesn't work for rendering error page
        //Inside then/catch/callbackPromise, we need to use next(new Error);
        next(new Error(err));
      });
  } else {
    return next();
  }
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.get("/500", errorController.get500);

app.use(errorController.get404);

//If we pass an error in next() then it will skip all other middlewares and use this error middleware we defined below.
//If we have more than one error handling middleware then they'll get executed from top to bottom like normal middleware.

//Error middleware
app.use((error, req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("logxx connected to mongoDB");
    app.listen(4000);
  })
  .catch((err) => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });