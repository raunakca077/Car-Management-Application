import express from 'express';
import Car from '../models/Car.js';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';


const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in 'uploads' directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `images-${Date.now()}${ext}`;
    cb(null, filename); // Generate a unique filename
  },
});

const upload = multer({ storage });

// Create a new car
router.post('/', protect, upload.array('images', 10), asyncHandler(async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const images = req.files.map(file => file.path);

    const car = new Car({
      user: req.user._id,
      title,
      description,
      images,
      tags: tags.split(','),
    });

    const createdCar = await car.save();
    res.status(201).json(createdCar);
  } catch (error) {
    console.error('Error creating car:', error.message);
    res.status(500).json({ message: 'Internal server error: Unable to create car' });
  }
}));

// Get all cars for the logged-in user
router.get('/', protect, asyncHandler(async (req, res) => {
  const cars = await Car.find({ user: req.user._id });
  res.json(cars);
}));

// Get a car by ID
router.get('/:id', protect, asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (car) {
    res.json(car);
  } else {
    res.status(404);
    throw new Error('Car not found');
  }
}));

// Update a car
router.put('/:id', protect, upload.array('images', 10), asyncHandler(async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Uploaded Files:', req.files);

  const { title, description, tags } = req.body;
  const images = req.files ? req.files.map(file => file.path) : [];

  const car = await Car.findById(req.params.id);

  if (car) {
    // Update fields if provided, otherwise keep the existing value
    car.title = title || car.title;
    car.description = description || car.description;
    car.tags = tags ? tags.split(',') : car.tags;

    // Only update images if new ones are uploaded
    if (images.length > 0) {
      car.images = images;
    }

    const updatedCar = await car.save();
    res.json(updatedCar);
  } else {
    res.status(404);
    throw new Error('Car not found');
  }
}));



// Delete a car
router.delete('/:id', protect, asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (car) {
    await car.deleteOne();
    res.json({ message: 'Car removed' });
  } else {
    res.status(404);
    throw new Error('Car not found');
  }
}));

export default router;