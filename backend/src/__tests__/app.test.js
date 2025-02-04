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
      // Mock the DataModel to return sample data
      jest.spyOn(require('../models/dataModel'), 'getAllData').mockResolvedValue([
        { id: 1, name: 'Test Data 1' },
        { id: 2, name: 'Test Data 2' },
      ]);

      const response = await request(app).get('/api/data');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([
        { id: 1, name: 'Test Data 1' },
        { id: 2, name: 'Test Data 2' },
      ]);
    });

    test('should return 500 if an error occurs', async () => {
      // Mock the DataModel to throw an error
      jest
        .spyOn(require('../models/dataModel'), 'getAllData')
        .mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/api/data');
      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ message: 'Database error' });
    });
  });

  // Test a non-existent route
  test('GET /nonexistent-route should return 404', async () => {
    const response = await request(app).get('/nonexistent-route');
    expect(response.statusCode).toBe(404);
  });

  // Test CORS middleware
  test('CORS middleware should be enabled', async () => {
    const response = await request(app).get('/health');
    expect(response.headers['access-control-allow-origin']).toBe('*');
  });

  // Test JSON middleware
  test('JSON middleware should parse request body', async () => {
    const response = await request(app)
      .post('/api/data')
      .send({ name: 'Test Data' })
      .set('Content-Type', 'application/json');
    expect(response.statusCode).not.toBe(400); // Ensure JSON parsing works
  });
});
