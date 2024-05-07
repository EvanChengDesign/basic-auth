'use strict';

// src/auth/models/index.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { require: true, rejectUnauthorized: false } : false,
  },
  logging: false, // Disable logging for testing
});

const UserModel = require('./users-model');

const User = UserModel(sequelize);

module.exports = {
  sequelize,
  User,
};
