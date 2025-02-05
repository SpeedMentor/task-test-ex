const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// Create a mock Express app for testing
const app = express();
app.use(bodyParser.json());

// Mock routes for testing
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

app.get('/api/data', (req, res) => {
  res.status(200).json([]);
});

app.post('/api/data', (req, res) => {
  res.status(201).json(req.body);
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

describe('Express App', () => {
  test('GET /health should return 200 and health status', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: 'OK',
      message: 'Backend is running',
    });
  });

  describe('GET /api/data', () => {
    test('should return 200 and data', async () => {
      const response = await request(app).get('/api/data');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]);
    });

    test('should return 500 if an error occurs', async () => {
      const originalImplementation = app.get;
      app.get = jest.fn((path, handler) => {
        if (path === '/api/data') {
          handler({}, { status: () => ({ json: () => { throw new Error('Database error'); } }) });
        } else {
          originalImplementation.call(app, path, handler);
        }
      });

      const response = await request(app).get('/api/data');
      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ message: 'Database error' });

      app.get = originalImplementation; // Restore original implementation
    });
  });

  test('GET /nonexistent-route should return 404', async () => {
    const response = await request(app).get('/nonexistent-route');
    expect(response.statusCode).toBe(404);
  });

  test('CORS middleware should be enabled', async () => {
    const response = await request(app).get('/health');
    expect(response.headers['access-control-allow-origin']).toBe('*');
  });

  test('JSON middleware should parse request body', async () => {
    const response = await request(app)
      .post('/api/data')
      .send({ name: 'Test Data' })
      .set('Content-Type', 'application/json');
    expect(response.statusCode).not.toBe(400);
    expect(response.body).toEqual({ name: 'Test Data' });
  });
});
