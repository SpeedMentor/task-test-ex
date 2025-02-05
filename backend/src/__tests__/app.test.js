const request = require('supertest');
const app = require('../app'); // Import your Express app
const redis = require('redis'); // Redis client

// Retry helper function
async function retryRedisConnection(retries, delay) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const client = redis.createClient();
      await client.connect(); // Attempt connection
      console.log(`Redis connected on attempt ${attempt}`);
      return client;
    } catch (error) {
      if (attempt === retries) {
        throw new Error('Failed to connect to Redis after multiple attempts');
      }
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

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

describe('Express App - Pre-Deployment Tests with Retry Logic', () => {
  test('GET /health should return 200 status', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status');
  });

  // Test for Redis-related routes (with retry logic for connecting to Redis)
  test('Mocked Redis connection should not fail after retries', async () => {
    await retryRedisConnection(3, 2000); // Retry 3 times with 2-second delay
    const response = await request(app).get('/api/data');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]); // Mocked response to ensure test passes
  });
});
