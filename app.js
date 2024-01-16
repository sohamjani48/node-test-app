const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const errorController = require("./controllers/errors.js");

const sequelize = require("./util/database.js");
const Product = require("./models/product.js");
const User = require("./models/user.js");

app.use(bodyParser.urlencoded());

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, "public")));
``;

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

// setting force true to sync the changes een after the tables are already created
sequelize
  .sync({ force: true })
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Soham", email: "Soham@workongri.com" });
    }
    return user;
  })
  .then((user) => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));

