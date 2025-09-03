const router = require("express").Router();
const userController = require("../controllers/user.controller");
const UserMiddleware = require("../middlewares/user.middleware");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({
        min: 6,
      })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerTempuser
);

router.post("/verify", userController.VerifyUser);

router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({
        min: 6,
      })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);

router.get("/me",  UserMiddleware.authUser ,userController.getMe )

router.post('/logout', UserMiddleware.authUser ,userController.logoutUser)

module.exports = router;
