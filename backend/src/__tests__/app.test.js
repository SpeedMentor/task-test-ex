const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());

// Mock the routes and middleware
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

app.get('/api/data', (req, res) => {
  res.status(200).json([{ id: 1, name: 'Test Data' }]);
});

app.post('/api/data', (req, res) => {
  res.status(200).json(req.body);
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

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
      const originalHandler = app._router.stack.find(layer => layer.route && layer.route.path === '/api/data').route.stack[0].handle;
      app.get('/api/data', (req, res, next) => {
        next(new Error('Database error'));
      });

      const response = await request(app).get('/api/data');
      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ message: 'Database error' });

      app.get('/api/data', originalHandler); // Restore original handler
    });
  });

  // Test a non-existent route
  test('GET /nonexistent-route should return 404', async () => {
    const response = await request(app).get('/nonexistent-route');
    expect(response.statusCode).toBe(404);
  });

  // Test JSON middleware
  test('JSON middleware should parse request body', async () => {
    const response = await request(app)
      .post('/api/data')
      .send({ name: 'Test Data' })
      .set('Content-Type', 'application/json');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name: 'Test Data' });
  });
});
