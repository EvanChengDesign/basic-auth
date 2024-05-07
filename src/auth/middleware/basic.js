'use strict';

const base64 = require('base-64');
const { sequelize } = require('../models/index');
const Users = require('../models/users-model')(sequelize);

async function basicAuth(req, res, next) {
  // Check if the Authorization header is present
  if (!req.headers.authorization) {
    console.log('Authorization header missing');
    return res.status(403).send('Authorization header is missing');
  }

  // Extract the encoded credentials from the header
  const basicHeaderParts = req.headers.authorization.split(' ');
  const encodedString = basicHeaderParts.pop();
  const decodedString = base64.decode(encodedString);
  const [username, password] = decodedString.split(':');

  console.log('Decoded credentials:', { username, password });

  try {
    // Attempt to authenticate the user
    const user = await Users.authenticateBasic(username, password);
    if (!user) {
      throw new Error('User not found');
    }

    console.log('User authenticated:', user.username);

    // Attach the authenticated user to the request
    req.user = user;
    next();
  } catch (error) {
    console.error('Invalid login attempt:', error.message);
    res.status(403).send('Invalid Login');
  }
}

module.exports = basicAuth;