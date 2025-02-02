const DataModel = require('../models/dataModel');

exports.getAllData = async (req, res) => {
  try {
    const data = await DataModel.getAllData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
