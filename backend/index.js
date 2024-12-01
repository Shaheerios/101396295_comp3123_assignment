const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS middleware
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Define routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ status: false, message: 'Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});