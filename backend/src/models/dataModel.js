const db = require('../config/db');

const DataModel = {
  getAllData: async () => {
    try {
      const query = 'SELECT * FROM sample_data';
      const [rows] = await db.promise().query(query);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
};

module.exports = DataModel;
