const redis = require('redis');
require('dotenv').config();

const client = redis.createClient({
  url: process.env.REDIS_URL || 'http://10.247.51.183:6379'
});

client.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  try {
    await client.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
})();

module.exports = client;
