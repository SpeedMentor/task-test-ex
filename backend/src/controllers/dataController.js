const db = require('../config/db');
const redisClient = require('redis').createClient();

exports.getData = (req, res) => {
  const cacheKey = 'data';

  // Check Redis cache
  redisClient.get(cacheKey, async (err, data) => {
    if (err) throw err;

    if (data) {
      // Return cached data
      res.json(JSON.parse(data));
    } else {
      // Fetch data from MySQL
      const query = 'SELECT * FROM sample_data';
      db.query(query, (err, results) => {
        if (err) throw err;

        // Cache data in Redis
        redisClient.setex(cacheKey, 3600, JSON.stringify(results));

        // Return data
        res.json(results);
      });
    }
  });
};
