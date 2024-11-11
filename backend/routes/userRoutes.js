const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new User
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    console.log(name + email + password);
    try {
        const { name, email, password } = req.body;
        // Check if user email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already registered' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password.trim(), 10);
        console.log('Hashed password register::', hashedPassword);

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
        console.log('User is', user);

        
        const testPassword = "123456";  // Example password to compare
        const storedHash = "$2a$10$.bDxxrqtLLAzwbotS/DYNeg94XhUeAmOUmUQfT.9ET7Ww97dPse0m";  // Sample bcrypt hash from your DB
        
        // Compare the password with the stored hash
        bcrypt.compare(testPassword, storedHash, (err, isMatch) => {
          if (err) {
            console.log('Error during comparison:', err);
          } else {
            console.log('Does the password match?', isMatch);  // Should log true if they match
          }
        });
        

        const password = req.body.password.trim();
        console.log('Stored hash:', user.password);  // Log the stored hash
        console.log('Entered password:', password);  // Log the entered password
        // Trim the password before saving or comparing
        // Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('isMatch is::', isMatch)
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        // Generate a JWT token
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

// Update User by ID
router.put('/:id', async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )
        if (!updateUser) return res.status(400).json({ message: 'Application not found' });
        res.json(updateUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a User by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(400).json({ message: 'User not found' });
        res.json({ message: 'Application Deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;