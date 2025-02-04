// __tests__/dataRoutes.test.js
const request = require('supertest');
const app = require('../app'); // Import your Express app

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
