// __tests__/dataController.test.js
const dataController = require('../controllers/dataController');
const DataModel = require('../models/dataModel');

jest.mock('../models/dataModel');

describe('dataController', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllData should return data with status 200', async () => {
    const mockData = [{ id: 1, name: 'Test Data' }];
    DataModel.getAllData.mockResolvedValue(mockData);

    await dataController.getAllData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  test('getAllData should return 500 if an error occurs', async () => {
    DataModel.getAllData.mockRejectedValue(new Error('Database error'));

    await dataController.getAllData(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
