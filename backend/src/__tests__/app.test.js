// __tests__/app.test.js
const request = require('supertest');
const app = require('../app'); // Import your Express app

describe('Express App', () => {
  // Test the health check route
  test('GET /health should return 200 and health status', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: 'OK',
      message: 'Backend is running',
    });
  });

  // Test the /api/data route
  describe('GET /api/data', () => {
    test('should return 200 and data', async () => {
      const response = await request(app).get('/api/data');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });

    test('should return 500 if an error occurs', async () => {
      // Mock the DataModel to throw an error
      jest
        .spyOn(require('../models/dataModel'), 'getAllData')
        .mockRejectedValue(new Error('Database error'));

      const response = await request(app
