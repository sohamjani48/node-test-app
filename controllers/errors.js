exports.get404 = (req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "error-404.html"));
  res.status(404).render("404", {
    pageTitle: "Error-404",
    path: "/123",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.get500 = (req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
};

