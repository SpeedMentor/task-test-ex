const express = require('express');
const dataController = require('../controllers/dataController');

const router = express.Router();

// Route to fetch all data
router.get('/', dataController.getAllData);

module.exports = router;
