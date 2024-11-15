import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

// Register a new user
router.post('/register', asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log('Registering user:', { name, email, password });

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    console.log('User created:', user);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
}));

// Login user
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required');
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401); // Unauthorized
    throw new Error('Invalid email or password');
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (isPasswordCorrect) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    // If password is incorrect, respond with an error
    res.status(401); // Unauthorized
    throw new Error('Invalid email or password');
  }
}));

export default router;