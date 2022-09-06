const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");
const auth = require("../authent/auth");



// --------------------------------------------------------------USER ROUTES-------------------------------------------------------------------------------------//
router.post("/signup", user_controller.signup);
router.post("/login", user_controller.login);
router.get("/getUserById", auth.requireToken, user_controller.getUserById); // by login person only 




module.exports = router;