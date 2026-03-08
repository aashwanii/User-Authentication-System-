import User from "../models/User.js";
import mongoose from "mongoose";

import bcrypt from "bcryptjs";

export const createUser = async(req,res) =>{
    const{name,email,password, role} = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashed,
        role
    });

    res.json(user);
} 

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id.trim();

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);  
    console.log(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }  
};

// UPDATE
export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ).select("-password");

  res.json(user);
//   console.log(user);
};

// DELETE
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

