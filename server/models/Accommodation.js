const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 1,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 500,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    host: {
      type: String,
      default: "Admin User",
    },
    description: {
      type: String,
      required: true,
    },
    amenities: {
      type: [String],
      default: ["Wi-Fi"],
    },
    image: {
      type: String,
      default: "https://placehold.co/900x600/f7f7f7/222?text=Property+Photo",
    },
    weeklyDiscount: {
      type: Number,
      default: 0,
    },
    cleaningFee: {
      type: Number,
      default: 0,
    },
    serviceFee: {
      type: Number,
      default: 0,
    },
    occupancyTaxes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Accommodation", accommodationSchema);