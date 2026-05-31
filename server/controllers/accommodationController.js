const Accommodation = require("../models/Accommodation");

const getAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find().sort({ createdAt: -1 });
    res.json(accommodations);
  } catch (error) {
    res.status(500).json({
      message: "Could not get accommodations.",
      error: error.message,
    });
  }
};

const getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found." });
    }

    res.json(accommodation);
  } catch (error) {
    res.status(500).json({
      message: "Could not get accommodation.",
      error: error.message,
    });
  }
};

const createAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.create(req.body);

    res.status(201).json({
      message: "Accommodation created successfully.",
      accommodation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not create accommodation.",
      error: error.message,
    });
  }
};

const updateAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found." });
    }

    res.json({
      message: "Accommodation updated successfully.",
      accommodation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not update accommodation.",
      error: error.message,
    });
  }
};

const deleteAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndDelete(req.params.id);

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found." });
    }

    res.json({ message: "Accommodation deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Could not delete accommodation.",
      error: error.message,
    });
  }
};

module.exports = {
  getAccommodations,
  getAccommodationById,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
};