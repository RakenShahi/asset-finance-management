const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require ('../middleware/auth');


// Register a new User
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const { name, email, password } = req.body;
        // Check if user email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already registered' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password.trim(), 10);

        // Create the new user with the hashed password
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const { email } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        // Trim the password before comparing
        const password = req.body.password.trim();

        // Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        // Generate a JWT token with 1 hour season time
        const token = jwt.sign({ userId: user._id }, 'secret_x', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Get the profile of the signed-in user
router.get('/profile', auth, async (req, res) => {
    try {
        // Find the user by ID from the decoded token (set in `auth` middleware)
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password from the response

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send user profile data
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to load profile data', error: error.message });
    }
});

// Update profilenof the signed-in  user
router.put('/profile', auth, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userId = req.user.userId; // From decoded token after auth middleware

        // Fetch the current user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the new email is already taken by another user
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email is already in use' });
            }
            user.email = email;
        }

        // Update name if provided
        user.name = name || user.name;

        // Update password only if a new one is provided
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // Save the updated user
        const updatedUser = await user.save();
        res.json({
            message: 'Profile updated successfully!',
            user: { name: updatedUser.name, email: updatedUser.email },
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile', error: error.message });
    }
});

module.exports = router;

// Update User by IDß
// router.put('/:id', async (req, res) => {
//     try {
//         const updateUser = await User.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             {
//                 new: true
//             }
//         )
//         if (!updateUser) return res.status(400).json({ message: 'Application not found' });
//         res.json(updateUser);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// Update User by ID (only accessible by the user themselves)
router.put('/:id', auth, async (req, res) => {
    try {
        // Ensure the authenticated user is only updating their own data
        if (req.user.userId !== req.params.id) {
            return res.status(403).json({ message: 'Forbidden: You can only update your own information' });
        }

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updateUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        res.json(updateUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;