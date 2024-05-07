'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('./middleware/basic');
const { sequelize } = require('./models/index');
const bcrypt = require('bcrypt');
const Users = require('./models/users-model')(sequelize);

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    console.log('Received signup request:', req.body);

    if (!req.body.password) {
      throw new Error('Password is required');
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await Users.create(req.body);
    console.log('User created successfully:', user);

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(403).send('Error creating user: ' + error.message);
  }
});

// Signin Route
router.post('/signin', basicAuth, (req, res) => {
  try {
    console.log('Signing in user:', req.user.username);
    res.status(200).json({
      message: `Welcome, ${req.user.username}!`,
      user: req.user,
    });
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;