const express = require("express");
const router= express.Router();
const verifyToken = require("../../middlewares/auth.middleware.js");


const { UserRegisteration, UserLogin, UserInfo } = require("../../controllers/user.controller.js");

router.post("/register", UserRegisteration);
router.post("/login", UserLogin);
router.post("/me", verifyToken, UserInfo);

module.exports = router;