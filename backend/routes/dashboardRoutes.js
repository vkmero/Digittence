const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const c = require("../controllers/dashboardController");

router.get("/", auth, c.stats);

module.exports = router;
