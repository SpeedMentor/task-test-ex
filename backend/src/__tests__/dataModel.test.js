// __tests__/dataModel.test.js
const DataModel = require('../models/dataModel');
const redisClient = require('../config/redis');
const db = require('../config/db');

// Mock Redis and MySQL
jest.mock('../config/redis');
jest.mock('../config/db');

describe('DataModel', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test('getAllData should return cached data if available', async () => {
    const mockData = [{ id: 1, name: 'Test Data' }];
    redisClient.get.mockResolvedValue(JSON.stringify(mockData));

    const data = await DataModel.getAllData();
    expect(data).toEqual(mockData);
    expect(redisClient.get).toHaveBeenCalledWith('sample_data');
    expect(db.query).not.toHaveBeenCalled();
  });

  test('getAllData should fetch data from MySQL if not cached', async () => {
    const mockData = [{ id: 1, name: 'Test Data' }];
    redisClient.get.mockResolvedValue(null);
    db.query.mockResolvedValue([mockData]);

    const data = await DataModel.getAllData();
    expect(data).toEqual(mockData);
    expect(redisClient.get).toHaveBeenCalledWith('sample_data');
    expect(db.query).toHaveBeenCalledWith('SELECT * FROM sample_data');
    expect(redisClient.setEx).toHaveBeenCalledWith('sample_data', 3600, JSON.stringify(mockData));
  });

  test('getAllData should throw an error if fetching data fails', async () => {
    redisClient.get.mockResolvedValue(null);
    db.query.mockRejectedValue(new Error('Database error'));

    await expect(DataModel.getAllData()).rejects.toThrow('Error fetching data: Database error');
  });
});
