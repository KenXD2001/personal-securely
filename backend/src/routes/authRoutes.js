const express = require('express');
const {
    login,
    register,
    sendOtp,
    verifyOtp,
    resetPassword,
    getUsers,
    getOtpRequests
} = require('../controllers/authController');
const router = express.Router();

// Post routes
router.post('/login', login);
router.post('/register', register);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

// Get routes
router.get('/users', getUsers);
router.get('/otp-requests', getOtpRequests);

module.exports = router;
