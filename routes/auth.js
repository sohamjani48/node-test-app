const express = require("express");
// const { check } = require("express-validator");
const { check, body } = require("express-validator");
const router = express.Router();

const authController = require("../controllers/auth");
const User = require("../models/mongoDbModels/user");

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.").normalizeEmail()
    ,
    body(
      "password",
      "Please enter the password with at least 5 characters and only having alphanumeric characters."
    )
      .isLength({ min: 5 })
      .isAlphanumeric().trim(),
  ],
  authController.postLogin
);

router.post("/logout", authController.postLogout);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        // if (value === "test@gmail.com") {
        //   throw new Error("This email is forbidden. Test@gmail.com");
        // }
        // return true;
        return User.findOne({ email: value }).then((userDoc) => {
          console.log("logxx userDoc is", userDoc);
          if (userDoc) {
            //Here if the we reject the promise then express validator will treat the rejected promise as error and set the error message provided in Promise reject
            return Promise.reject(
              "Email exists already, please pick a different one."
            );
          }
        });
      }).normalizeEmail(),
    body(
      "password",
      "Please enter the password with at least 5 characters and only having alphanumeric characters."
    )
      .isLength({ min: 5 })
      .isAlphanumeric().trim(),
    body("confirmPassword").custom((value, { req }) => {
      console.log("logxx confirm password is;", value);
      if (value !== req.body.password) {
        throw new Error("Condifrm Password doesn't match password.");
      }
      return true;
    }).trim(),
  ],
  authController.postSignup
);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
