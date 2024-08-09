const express = require('express');
const { createUser, changeUserStatus, getUserListing } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/users', createUser);
router.patch('/users/status', protect, changeUserStatus);
router.get('/users/listing', protect, getUserListing);

module.exports = router;