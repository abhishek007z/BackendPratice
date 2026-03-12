// 1. Import express and mongoose
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/User.js';

// 2. Initialize app
const app = express();
const port = 4000; // Server will run on http://localhost:4000

// ✅ MIDDLEWARES
app.use(cors());           // Allow frontend to connect to backend (CORS)
app.use(express.json());   // Parse incoming JSON data

// 3. MongoDB Connection
mongoose.connect('mongodb://localhost:27017/myDatabaseforpratice', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// 4. Routes

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the MongoDB-connected backend!');
});

// Weather Route
app.get('/weather', (req, res) => {
  const city = req.query.city;
  res.send(`Weather data for: ${city}`);
});

// Add User Route (POST)
app.post('/add-user', async (req, res) => {
  try {
    const { name, age } = req.body;
    const newUser = new User({ name, age });  // Create new user from schema
    await newUser.save();                     // Save to MongoDB
    res.send('User added to database!');
  } catch (err) {
    res.status(500).send('Error saving user');
  }
});

// 5. Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
