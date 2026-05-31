const Reservation = require("../models/Reservation");

const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("accommodation")
      .sort({ createdAt: -1 });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({
      message: "Could not get reservations.",
      error: error.message,
    });
  }
};

const createReservation = async (req, res) => {
  try {
    const { guestName, accommodation, checkIn, checkOut, guests, total } = req.body;

    if (!guestName || !accommodation || !checkIn || !checkOut || !guests || !total) {
      return res.status(400).json({
        message: "Please complete all reservation fields.",
      });
    }

    const reservation = await Reservation.create({
      guestName,
      accommodation,
      checkIn,
      checkOut,
      guests,
      total,
    });

    res.status(201).json({
      message: "Reservation created successfully.",
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not create reservation.",
      error: error.message,
    });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found.",
      });
    }

    res.json({
      message: "Reservation deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not delete reservation.",
      error: error.message,
    });
  }
};

module.exports = {
  getReservations,
  createReservation,
  deleteReservation,
};