const User = require('../models/userModel');
const Otp = require('../models/OTP');
const jwt = require('jsonwebtoken');

// Mock OTP store
const otpStore = {};

exports.register = async (req, res) => {
    const { name, email, phone, password, confirmPassword } = req.body;
    console.log('Register request received:', { name, email, phone });

    if (password !== confirmPassword) {
        console.log('Passwords do not match');
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const user = new User({ name, email, phone, password });
        await user.save();
        console.log('User registered successfully:', { email });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err.message);
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', { email });

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Login failed: Email not found:', email);
            return res.status(404).json({ message: 'User email not present in the database' });
        }

        // Check if the password is correct
        if (user.password !== password) {
            console.log('Login failed: Incorrect password for email:', email);
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Generate JWT token with user ID
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
        console.log('Login successful:', { email, token });
        res.json({ token });

    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({ message: err.message });
    }
};


exports.sendOtp = async (req, res) => {
    const { email } = req.body;
    console.log('Send OTP request received for email:', email);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Email not found:', email);
            return res.status(404).json({ message: 'Email not found' });
        }

        const otp = '123456'; // Replace with a random OTP generator
        await Otp.findOneAndUpdate(
            { email },
            { otp, otpVerified: false, createdAt: Date.now() }, // Update if exists
            { upsert: true, new: true }
        );

        console.log('OTP generated and saved to DB:', { email, otp });
        res.json({ message: 'OTP sent successfully' });
    } catch (err) {
        console.error('Error sending OTP:', err.message);
        res.status(500).json({ message: err.message });
    }
};

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    console.log('Verify OTP request received:', { email, otp });

    try {
        const otpEntry = await Otp.findOne({ email, otp });
        if (otpEntry) {
            otpEntry.otpVerified = true;
            await otpEntry.save();

            console.log('OTP verified successfully for email:', email);
            res.json({ message: 'OTP verified successfully' });
        } else {
            console.log('Invalid OTP for email:', email);
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (err) {
        console.error('Error verifying OTP:', err.message);
        res.status(500).json({ message: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { email, newPassword, confirmNewPassword } = req.body;
    console.log('Reset password request received for email:', email);

    if (newPassword !== confirmNewPassword) {
        console.log('Passwords do not match for reset password:', email);
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const otpEntry = await Otp.findOne({ email, otpVerified: true });
        if (!otpEntry) {
            console.log('OTP not verified for reset password:', email);
            return res.status(400).json({ message: 'OTP not verified' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log('Email not found for reset password:', email);
            return res.status(404).json({ message: 'Email not found' });
        }

        user.password = newPassword;
        await user.save();

        // Clean up OTP entry after successful reset
        await Otp.deleteOne({ email });
        console.log('Password reset successfully for email:', email);
        res.json({ message: 'Password reset successfully' });
    } catch (err) {
        console.error('Error resetting password:', err.message);
        res.status(500).json({ message: err.message });
    }
};

exports.getUserData = async (req, res) => {
    try {
        const userId = req.user.userId; // Extract the userId from the token
        const user = await User.findById(userId); // Fetch the user by ID

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the user's data as a response
        res.json({
            name: user.name,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    } catch (err) {
        console.error('Error fetching user data:', err.message);
        res.status(500).json({ message: err.message });
    }
};

exports.getUsers = async (req, res) => {
    console.log('Get users request received');
    try {
        const users = await User.find({}, '-password');
        console.log('Users retrieved:', users.length);
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).json({ message: err.message });
    }
};

exports.getOtpRequests = (req, res) => {
    console.log('Get OTP requests received');
    const otpRequests = Object.keys(otpStore).map(email => ({
        email,
        otp: otpStore[email]
    }));
    console.log('OTP requests:', otpRequests.length);
    res.json(otpRequests);
};
