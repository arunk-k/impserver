const User = require('../models/userModel');
const jwt=require('jsonwebtoken')

// Login admin
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await User.findOne({ email, password, role: "admin" });

    if (!admin) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const token = jwt.sign({ userId: admin._id, role: admin.role }, process.env.SECRETKEY, { expiresIn: '7d' });

    res.status(200).json({message: "Admin login successful",token,user: {id: admin._id,fullName: admin.fullName,email: admin.email,role: admin.role}})

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Register a new user
exports.registerUser = async (req, res) => {

  try {
    const { fullName, email, password } = req.body;

    // Check if all fields are provided
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password, // (hash this later)
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }

};

//Login user
exports.loginUser = async (req, res) => {

  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email and password (not secure — only for testing)
    const existing = await User.findOne({ email, password})

    if (!existing) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create token
    const token = jwt.sign({ userId: existing._id, role: existing.role },process.env.SECRETKEY,{ expiresIn: '7d' })

    res.status(200).json({message: "Login successful",token,user: {id: existing._id,fullName: existing.fullName,email: existing.email,role: existing.role}})

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
  
} 