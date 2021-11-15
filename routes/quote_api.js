const express = require('express');
const router = express.Router();
const quote_controller = require('../controllers/quotesController');

//apis for quotes
router.post('/', quote_controller.quote_create);

// api to get alll quotes
router.get('/', quote_controller.quote_get_all);

// API to get an quote based on aployee user_name
router.get('/:user_name', quote_controller.quote_get_all_for_user);

module.exports = router;