// src/server.js

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors'); // Import CORS middleware
require('dotenv').config();

const app = express();
connectDB();

// Configure CORS middleware
app.use(
    cors({
        origin: 'http://localhost:5173', // Allow requests from this origin
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
        credentials: true, // Allow cookies and authentication headers
    })
);

app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
