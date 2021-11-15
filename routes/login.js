const express = require('express');
const router = express.Router();
const employee_controller = require('../controllers/employeeController');
const loginController = require('../controllers/loginController');

// GET login page
router.get('/', loginController.login_get);

router.post('/', employee_controller.employee_check_credentials);

// If user is attempting to access a resource that doesn't exist
router.use((req,res) => {
    res.status(404).send('error 404');
});

module.exports = router;