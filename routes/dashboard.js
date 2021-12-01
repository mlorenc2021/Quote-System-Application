const express = require('express');
const { route } = require('.');
const router = express.Router();
const dashboard = require('../controllers/dashboardController');

//sales dashboard
router.get('/sales', dashboard.sales_dashboard);
router.get('/sales/create_quote', dashboard.create_quote);
router.get('/sales/finalize_quote', dashboard.finalize_quote);
router.get('/sales/perform_finalize_quote/:id', dashboard.perform_finalize_quote);
router.get('/sales/edit_quote/:id', dashboard.edit_quote);


//manager dashboard
router.get('/manager', dashboard.manager_dashboard);
router.get('/manager/update_quote/:id', dashboard.edit_quote);
router.get('/manager/sanction_quote', dashboard.sanction_quote);
router.get('/manager/perform_sanction_quote/:id', dashboard.perform_sanction_quote);


//accountant dashboard
router.get('/accountant', dashboard.accountant_dashboard);
router.get('/accountant/process_order', dashboard.process_order);
router.get('/accountant/update_quote/:id', dashboard.edit_quote);


//admin dashboard
router.get('/admin', dashboard.admin_dashboard);
router.get('/admin/manage_users', dashboard.manage_users);
router.get('/admin/review_quotes', dashboard.review_quotes);
router.get('/admin/create_employee', dashboard.create_employee);
router.get('/admin/edit_employee/:user_name', dashboard.edit_employee);


module.exports = router;