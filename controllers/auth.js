const User = require("../models/mongoDbModels/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  // //This is how we set cookies in Browser, Now after setting this cookie, this cookie will go in every request
  // res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly");

  //object is added by middleware, in that we can add any key we want
  User.findById("65d23ee7cbfb1aa906f2eb86")
    .then((user) => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};
