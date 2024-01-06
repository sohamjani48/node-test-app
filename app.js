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

const adminData = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");

app.use(bodyParser.urlencoded());

app.use("/admin", adminData.routes);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "error-404.html"));
  res.status(404).render("404", { pageTitle: "Error-404" });
});

app.listen(4000);
