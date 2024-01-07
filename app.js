const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// //Setting up **pug** engine
// app.set("view engine", "pug");
// app.set("views", "views");

// //Setting up **ejs** engine
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const errorController = require("./controllers/errors.js");

app.use(bodyParser.urlencoded());

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.use(errorController.get404);

app.listen(4000);
