const express = require('express');
const router = express.Router();
const customer_controller = require('../controllers/customerController');

// API to get all customers
router.get('/', customer_controller.customer_get_all);

module.exports = router;