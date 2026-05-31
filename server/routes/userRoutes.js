const express = require("express");
const { registerUser, loginUser, getUsers } = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, adminOnly, getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;