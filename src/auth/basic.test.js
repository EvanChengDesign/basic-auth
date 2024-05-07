// src/auth/basic.test.js
'use strict';

require('dotenv').config();
const { User } = require('../auth/models/users-model');
const { sequelize } = require('../auth/models/index');
const basicAuth = require('../auth/middleware/basic');
const httpMocks = require('node-mocks-http');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

jest.mock('../auth/models/users-model', () => {
  return {
    User: {
      authenticateBasic: jest.fn(),
    },
  };
});

describe('Basic Auth Middleware', () => {
  it('should authenticate a user with valid credentials', async () => {
    const req = httpMocks.createRequest({
      headers: {
        authorization: 'Basic dGVzdHVzZXI6dGVzdHBhc3M=',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    User.authenticateBasic.mockResolvedValue({ username: 'testuser' });

    await basicAuth(req, res, next);
    expect(req.user).toBeDefined();
    expect(req.user.username).toBe('testuser');
    expect(next).toHaveBeenCalledWith();
  });

  it('should return an error with invalid credentials', async () => {
    const req = httpMocks.createRequest({
      headers: {
        authorization: 'Basic invalid',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    User.authenticateBasic.mockRejectedValue(new Error('Invalid credentials'));

    await basicAuth(req, res, next);
    expect(res.statusCode).toBe(403);
    expect(res._getData()).toBe('Invalid Login');
    expect(next).not.toHaveBeenCalled();
  });
});

afterAll(async () => {
  await sequelize.close();
});
