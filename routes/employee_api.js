const express = require('express');
const router = express.Router();
const employee_controller = require('../controllers/employeeController');

// API to create an employee
router.post('/', employee_controller.employee_create);

// API to get all employees from employees table
router.get('/', employee_controller.employee_get_all);

// API to get an employee based on user_name
router.get('/:user_name', employee_controller.employee_get_one);

module.exports = router;