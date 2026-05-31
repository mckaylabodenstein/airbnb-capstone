const express = require("express");
const {
  getAccommodations,
  getAccommodationById,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
} = require("../controllers/accommodationController");

const router = express.Router();

router.get("/", getAccommodations);
router.get("/:id", getAccommodationById);
router.post("/", createAccommodation);
router.put("/:id", updateAccommodation);
router.delete("/:id", deleteAccommodation);

module.exports = router;