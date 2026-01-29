const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const c = require("../controllers/studentController");

router.get("/rollnos", auth, c.getRollNos);

module.exports = router;
