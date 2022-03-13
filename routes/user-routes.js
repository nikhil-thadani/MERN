const express = require("express");
const userControler = require("../controller/user-controller");

const router = express.Router();
router.post("/signup", userControler.signup);
router.post("/login", userControler.login, userControler.verifyToken);
router.get("/user/:id", userControler.verifyToken, userControler.getUser); // wrong againnnnn
router.get("/users", userControler.getAllUsers);

router.get(
  "/refresh",
  userControler.refreshToken,
  userControler.verifyToken,
  userControler.getUser
);

module.exports = router;
