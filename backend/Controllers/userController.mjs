import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { userCollection } from "../Models/userModel.mjs";


const generateToken = (user) => {
  console.log("🔑 Generating Token for User Role:", user.role);  // Debugging
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_KEY, {
    expiresIn: "50m",
  });
};


// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await userCollection.create({
      name,
      username,
      email,
      password: hashedPassword,
      role: role && ["admin", "coordinator", "user"].includes(role) ? role : "user",
    });

    // Generate JWT Token
    const token = generateToken(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};
// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    console.log("✅ User Role During Login:", user.role);  // Debugging

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role, // Make sure role is returned
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

// Get User Profile (Protected)
export const getUserProfile = async (req, res) => {
  try {
    const user = await userCollection.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

// Get All Users (Admin-only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await userCollection.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

// Delete User (Admin-only)
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userCollection.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await userCollection.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};
