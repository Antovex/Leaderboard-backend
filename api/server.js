require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('../config/db');

const User = require('../models/user.model');
const ClaimHistory = require('../models/claimHistory.model');

const app = express();
const port = process.env.PORT || 8000;

// connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Populate initial users
// const populateUsers = async () => {
//     const users = [
//         'Rahul',
//         'Kamal',
//         'Sanaki',
//         'Karan',
//         'Anto',
//         'Sakshi',
//         'Mohit',
//         'Vishal',
//         'Shivam',
//         'Shubham',
//     ];
//     for (const name of users) {
//         const exists = await User.findOne({ name });
//         if (!exists) await new User({ name }).save();
//     }
// };
// populateUsers();

// API endpoints
app.get('/', (req, res) => {
    res.status(200).json({ message: `Server is running on port: ${port}` });
})

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        // console.log('Get api/users');
        const users = await User.find().sort({ totalPoints: -1 });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error while getting all users!');
    }
});

// Add a new user
app.post('/api/users', async (req, res) => {
    try {
        const { name } = req.body;
        const newUser = new User({ name });
        await newUser.save();
        const userData = {
            name: newUser.name,
            totalPoints: newUser.totalPoints
          };
          res.json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error while adding new user!');
    }
});

// Claim points for a user
app.post('/api/claim-points/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const randomPoints = Math.floor(Math.random() * 10) + 1;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.totalPoints += randomPoints;
        await user.save();

        const claimHistory = new ClaimHistory({ userId, points: randomPoints });
        await claimHistory.save();

        res.json({ userId, points: randomPoints });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error while claiming points!');
    }
});

// Get claim history
app.get('/api/history', async (req, res) => {
    try {
        const history = await ClaimHistory.find().sort({ timestamp: -1 });
        res.json(history);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error while getting claim history!');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
