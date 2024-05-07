// Integration Test
// server.test.js
require('dotenv').config();
const request = require('supertest');
const { app, start } = require('../src/server');
const { sequelize } = require('../src/auth/models/index');
const User = require('../src/auth/models/users-model');

// Synchronize the database before running tests
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Authentication Routes', () => {
  // Test case for the signup route
  it('POST /signup should create a new user and return 201 status', async () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword',
    };

    const response = await request(app)
      .post('/signup')
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.username).toBe(newUser.username);
  });

  // Test case for the signin route (valid credentials)
  it('POST /signin should login the user and return 200 status', async () => {
    const response = await request(app)
      .post('/signin')
      .auth('testuser', 'testpassword');

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Welcome');
  });

  // Test case for the signin route (invalid credentials)
  it('POST /signin should return 403 for invalid credentials', async () => {
    const response = await request(app)
      .post('/signin')
      .auth('nonexistent', 'wrongpassword');

    expect(response.statusCode).toBe(403);
    expect(response.text).toContain('Invalid Login');
  });
});

describe('Basic Authentication Middleware', () => {
  // Mock user data to be used for middleware testing
  beforeAll(async () => {
    await User.create({ username: 'authUser', password: 'authPassword' });
  });

  // Middleware test for valid authentication
  it('should attach user to request object if authentication is valid', async () => {
    const response = await request(app)
      .get('/protected-route') // Replace with an actual protected route in your app
      .auth('authUser', 'authPassword');

    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe('authUser');
  });

  // Middleware test for invalid authentication
  it('should call next with "Invalid Login" if authentication fails', async () => {
    const response = await request(app)
      .get('/protected-route') // Replace with an actual protected route in your app
      .auth('wrongUser', 'wrongPassword');

    expect(response.statusCode).toBe(403);
    expect(response.text).toContain('Invalid Login');
  });
});
