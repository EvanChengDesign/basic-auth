'use strict';

const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Basic authentication function
  User.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }
    return user;
  };

  // Hash password before saving it to the database
  User.beforeCreate(async (user) => {
    console.log('Hashing password for user:', user.username);
    try {
      user.password = await bcrypt.hash(user.password, 10);
      console.log('Password hashed successfully');
    } catch (error) {
      console.error('Error hashing password:', error);
      throw new Error('Password hashing failed');
    }
  });

  return User;
};
