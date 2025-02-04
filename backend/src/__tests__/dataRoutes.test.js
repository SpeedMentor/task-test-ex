// __tests__/dataRoutes.test.js
const request = require('supertest');
const app = require('../app'); // Import your Express app

describe('GET /api/data', () => {
  test('should respond with 200 and return data', async () => {
    const response = await request(app).get('/api/data');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  test('should respond with 500 if an error occurs', async () => {
    // Mock an error in the DataModel
    jest.spyOn(require('../models/dataModel'), 'getAllData').mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/api/data');
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ message: 'Database error' });
  });
});
