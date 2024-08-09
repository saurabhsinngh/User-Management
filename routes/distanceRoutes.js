const express = require('express');
const { getDistance } = require('../controllers/distanceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/distance', protect, getDistance);

module.exports = router;
