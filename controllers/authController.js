import User from "../models/User.js";

import bcrypt from "bcryptjs";

import generateToken from "../utils/generateToken.js";

// export const register = async (req,res)=>{
//     const{ name, email, password} = req.body;

//     // check email
//     const exists  = User.findOne({email});
//     if(exists) return res.status(400).json({message: "User exists "});

//     const hashed = await bcrypt.hash(password, 10);

//     const user = await User.create({
//     name,
//     email,
//     password: hashed
//   });

//   res.json({token: generateToken(user._id)});
  
// };


export const register = async (req, res) => {
  const { name, email, password } = req.body;

  console.log("EMAIL RECEIVED:", email);

  const exists = await User.findOne({ email });

  console.log("USER FOUND:", exists);

  if (exists) {
    return res.status(400).json({ message: "User exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed
  });

  console.log("USER CREATED:", user.email);

  res.json({ token: generateToken(user._id) });
};


// login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid" });

  res.json({
    token: generateToken(user._id),
    role: user.role
  });
};

export const profile = async (req, res) => {
  res.json(req.user);
};