const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Accommodation = require("./models/Accommodation");

dotenv.config();

const listings = [
  {
    title: "Private Room in Johannesburg",
    location: "Johannesburg",
    type: "Private room",
    guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    price: 650,
    rating: 4.5,
    reviews: 96,
    host: "Lerato",
    description:
      "A neat and affordable private room in Johannesburg, ideal for one guest travelling for work or a short city stay.",
    amenities: ["Wi-Fi", "Workspace", "Secure parking", "Shared kitchen"],
    image:
      "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    title: "Cosy Studio in Cape Town",
    location: "Cape Town",
    type: "Entire studio",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 950,
    rating: 4.7,
    reviews: 142,
    host: "Mia",
    description:
      "A cosy studio apartment in Cape Town, perfect for a couple or solo traveller wanting a comfortable city stay.",
    amenities: ["Wi-Fi", "Kitchenette", "Free parking", "Balcony"],
    image:
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    title: "Sea View Apartment in Cape Town",
    location: "Cape Town",
    type: "Entire apartment",
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    price: 1650,
    rating: 4.8,
    reviews: 210,
    host: "Daniel",
    description:
      "A bright sea view apartment close to Cape Town’s beaches, restaurants and main tourist attractions.",
    amenities: ["Wi-Fi", "Ocean view", "Kitchen", "Free parking", "Washing machine"],
    image:
      "https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    title: "Beachfront Family Apartment in Durban",
    location: "Durban",
    type: "Entire beach apartment",
    guests: 5,
    bedrooms: 2,
    bathrooms: 2,
    price: 1350,
    rating: 4.6,
    reviews: 165,
    host: "Thabo",
    description:
      "A relaxed beachfront apartment in Durban, ideal for families wanting warm weather and easy beach access.",
    amenities: ["Wi-Fi", "Beach access", "Kitchen", "Free parking", "Family friendly"],
    image:
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    title: "Modern Apartment in New York",
    location: "New York",
    type: "Entire apartment",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 2400,
    rating: 4.8,
    reviews: 320,
    host: "Johann",
    description:
      "A modern New York apartment for two guests, close to restaurants, shops and busy city attractions.",
    amenities: ["Wi-Fi", "Kitchen", "Lift access", "Air conditioning", "Workspace"],
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    title: "Family Apartment in New York",
    location: "New York",
    type: "Entire apartment",
    guests: 5,
    bedrooms: 3,
    bathrooms: 2,
    price: 4200,
    rating: 4.9,
    reviews: 188,
    host: "Emily",
    description:
      "A spacious New York family apartment with enough space for five guests and easy access to the city.",
    amenities: ["Wi-Fi", "Kitchen", "Washing machine", "Air conditioning", "Family friendly"],
    image:
      "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    title: "Elegant Studio in Paris",
    location: "Paris",
    type: "Entire studio",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 2100,
    rating: 4.9,
    reviews: 275,
    host: "Claire",
    description:
      "A romantic Paris studio with elegant finishes, perfect for two guests exploring cafés, museums and city streets.",
    amenities: ["Wi-Fi", "Kitchenette", "Heating", "City view", "Coffee machine"],
    image:
      "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    title: "Classic Townhouse Room in London",
    location: "London",
    type: "Private room",
    guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    price: 1800,
    rating: 4.6,
    reviews: 154,
    host: "Oliver",
    description:
      "A private room in a classic London townhouse, suitable for one guest wanting a comfortable city base.",
    amenities: ["Wi-Fi", "Heating", "Shared kitchen", "Washer"],
    image:
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    title: "Tropical Villa in Bali",
    location: "Bali",
    type: "Private villa",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    price: 1700,
    rating: 4.9,
    reviews: 310,
    host: "Ayu",
    description:
      "A peaceful tropical villa in Bali with a private pool and garden, perfect for a relaxing holiday.",
    amenities: ["Wi-Fi", "Private pool", "Kitchen", "Garden", "Air conditioning"],
    image:
      "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    title: "Luxury Cliff Villa in Santorini",
    location: "Santorini",
    type: "Luxury villa",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 3900,
    rating: 5.0,
    reviews: 190,
    host: "Nikos",
    description:
      "A luxury Santorini villa for two guests with bright white finishes, sea views and a peaceful island atmosphere.",
    amenities: ["Wi-Fi", "Sea view", "Private terrace", "Breakfast included", "Air conditioning"],
    image:
      "https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
];

async function seedListings() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected.");

    await Accommodation.deleteMany();
    console.log("Old accommodations removed.");

    await Accommodation.insertMany(listings);
    console.log("New accommodation listings added successfully.");

    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    mongoose.connection.close();
  }
}

seedListings();