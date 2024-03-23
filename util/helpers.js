const showErrorPage = (err) => {
  console.log("logxx this executerd");
  const error = new Error(err);
  error.httpStatusCode = 500;
  return next(error);
};

module.exports = { showErrorPage };
