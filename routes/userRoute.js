const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  {authenticateUser,generateSecretKey} =require('../middleware')
const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');
const secretKey = generateSecretKey();
router.route('/user/register').post(async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    User.create({ username, password: hashedPassword }).then(user=>{
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
      res.json({ message: 'User registered successfully' ,user :user,token:token });
    })

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route('/user/login').post(async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the password doesn't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route('/user/history').get(authenticateUser,async (req, res) => {
  try {
    const userId = req.userId;
    const userHistory = await Transaction.find({userId:userId});
    if(userHistory){
      res.json(userHistory)
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
