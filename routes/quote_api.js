const express = require('express');
const router = express.Router();
const quote_controller = require('../controllers/quotesController');

//apis for quotes
router.post('/', quote_controller.quote_create);

// api to get alll quotes
router.get('/', quote_controller.quote_get_all);

//apis for quotes
router.post('/update', quote_controller.quote_update);

//apis for quotes
router.post('/delete/line_item', quote_controller.delete_line_item);

//apis for quotes
router.post('/delete/secret_note', quote_controller.delete_secret_note);

// API to get an quote based on aployee user_name
router.get('/:user_name', quote_controller.quote_get_all_for_user);

router.delete('/',);

// API to get an quote based on  quote_id
router.get('/:id', quote_controller.quote_get_one);

// API to get a customer query
router.post('/review', quote_controller.review_quotes);

// API to finalize a quote
router.get('/finalize/:id', quote_controller.finalize_quote);

// API to finalize a quote
router.get('/sanction/:id', quote_controller.sanction_quote);

// API to finalize a quote
router.get('/process/:id', quote_controller.purchase_order);


module.exports = router;