const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const c = require("../controllers/attendanceController");

router.post("/final-submit", auth, c.finalSubmit);

module.exports = router;
