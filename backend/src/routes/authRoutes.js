const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/authController");
console.log("AUTH CONTROLLER EXPORT:", ctrl);

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);

module.exports = router;