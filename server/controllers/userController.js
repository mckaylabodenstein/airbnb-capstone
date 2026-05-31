const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "fallback_secret", {
    expiresIn: "30d",
  });
}

async function registerUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name, email and password.",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists.",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed.",
      error: error.message,
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password.",
      });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed.",
      error: error.message,
    });
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Could not get users.",
      error: error.message,
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
};
