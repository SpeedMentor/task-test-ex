const db = require('../config/db');
const redisClient = require('../config/redis');

const DataModel = {
  getAllData: async () => {
    try {
      // Check if data is cached in Redis
      const cacheData = await redisClient.get('sample_data');
      if (cacheData) {
        return JSON.parse(cacheData);
      }

      // Fetch data from MySQL if not cached
      const [rows] = await db.query('SELECT * FROM sample_data');

      // Store data in Redis with a 1-hour expiration time
      await redisClient.setEx('sample_data', 3600, JSON.stringify(rows));

      return rows;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
};

module.exports = DataModel;
