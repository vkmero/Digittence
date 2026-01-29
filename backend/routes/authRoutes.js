const router = require("express").Router();
const c = require("../controllers/authController");

router.post("/register", c.register);
router.post("/login", c.login);
router.post("/forgot-password", c.forgotPassword);

module.exports = router;
