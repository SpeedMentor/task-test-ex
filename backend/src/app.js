const express = require('express');
const mysql = require('mysql2');
const redis = require('redis');
const dataRoutes = require('./routes/dataRoutes');

const app = express();

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'mydb',
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// Redis connection
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});

redisClient.on('connect', () => {
  console.log('Redis connected...');
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/data', dataRoutes);

module.exports = app;
