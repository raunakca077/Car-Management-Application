import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import carRoutes from './routes/carRoutes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

dotenv.config()

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

app.use(cors({ origin: '*' })); 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);

// Default route for other paths
// app.use('/', (req, res) => {
//   res.send("Welcome buddy");
// });

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});