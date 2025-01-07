// src/routes/authRoutes.js

const express = require('express');
const {
    login,
    register,
    sendOtp,
    verifyOtp,
    resetPassword,
    getUsers,
    getOtpRequests,
    getUserData // Import the new controller
} = require('../controllers/authController');
const authenticate = require('../middlewares/authenticate'); // Import the authenticate middleware
const router = express.Router();

// Post routes
router.post('/login', login);
router.post('/register', register);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

// Get routes
router.get('/users', getUsers); // Leave this as is
router.get('/otp-requests', getOtpRequests); // You can optionally protect this route too
router.get('/user-data', authenticate, getUserData); // New route for getting user data

module.exports = router;
