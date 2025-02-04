const request = require('supertest');
const app = require('../app'); // Import your Express app

describe('Express App', () => {
  test('GET /health should return 200 and health status', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: 'OK',
      message: 'Backend is running',
    });
  });
});
