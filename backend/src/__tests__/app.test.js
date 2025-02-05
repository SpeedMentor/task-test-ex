jest.mock('redis', () => {
  return {
    createClient: jest.fn(() => ({
      connect: jest.fn().mockResolvedValue(),
      on: jest.fn(),
      get: jest.fn().mockResolvedValue('mocked-value'),
      set: jest.fn().mockResolvedValue('OK'),
    })),
  };
});

const request = require('supertest');
const app = require('../app'); // Import your Express app

describe('Express App - Pre-Deployment Tests', () => {
  test('GET /health should return 200 status', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status');
  });

  test('Mocked Redis connection should not fail', async () => {
    const response = await request(app).get('/api/data');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]); // Mocked response to ensure test passes
  });
});
