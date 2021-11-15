const express = require('express');
const { route } = require('.');
const router = express.Router();
const dashbaord = require('../controllers/dashbaordController');

router.get('/sales', dashbaord.sales_dashboard);
router.get('/manager', dashbaord.manager_dashboard);
router.get('/accountant', dashbaord.accountant_dashboard);
router.get('/admin', dashbaord.admin_dashboard);

module.exports = router;