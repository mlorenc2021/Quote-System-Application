const employee = require('./employeeController');
const customer = require('./customerController');
const quote = require('./quotesController');

//sales dashboard and interfaces
exports.sales_dashboard = async function(req,res) {
    await res.render('./sales/sales_dashboard.ejs');
};

exports.create_quote = async function (req, res) {
    cust = await customer.customer_get_all();
    // console.log(cust) 
    await res.render('./sales/create_quote.ejs', {cust: cust});
};

exports.edit_quote = async function (req, res) {
    qte = await quote.quote_get_one(req,res);
    cust = await customer.customer_get_all();
    console.log('What is quote.id?:',qte.id);
    line_items = await quote.get_line_items(qte.id);
    secret_notes = await quote.get_secret(qte.id);
    await res.render('./sales/edit_quote.ejs', {
        qte:qte, 
        line_items:line_items, 
        secret_notes:secret_notes,
        cust:cust
    });
};

exports.finalize_quote = async function (req, res) {
    qte = await quote.quote_get_all_by_status('draft');
    await res.render('./sales/finalize_quote.ejs');
};




//manager dashboard and interfaces
exports.manager_dashboard = async function(req,res) {
    await res.render('./manager/manager_dashboard.ejs');
};

exports.update_quote = async function (req, res) {
    qte = await quote.quote_get_one(req, res);
    cust = await customer.customer_get_all();
    console.log('What is quote.id?:', qte.id);
    line_items = await quote.get_line_items(qte.id);
    secret_notes = await quote.get_secret(qte.id);
    await res.render('./manager/update_quote.ejs', {
        qte: qte,
        line_items: line_items,
        secret_notes: secret_notes,
        cust: cust
    });
};

exports.sanction_quote = async function (req, res) {
    qte = await quote.quote_get_all_by_status('finalized');
    await res.render('./manager/sanction_quote.ejs');
};


//accountant dashboard and interfaces
exports.accountant_dashboard = async function(req,res) {
    await res.render('./accountant/accountant_dashboard.ejs');
};

exports.process_order = async function (req, res) {
    await res.render('./accountant/process_order.ejs');
};


//admin dashboard and interfaces
exports.admin_dashboard = async function(req,res) {
    await res.render('./admin/admin_dashboard.ejs');
};

exports.manage_users = async function (req, res) {
    // Use employee controller get all function to get the employee obj
    emp = await employee.employee_get_all();
    // Send the emp object to the admin page
    await res.render('./admin/manage_users.ejs', {emp: emp});
};

exports.review_quotes = async function (req, res) {
    emp = await employee.employee_get_all();
    cust = await customer.customer_get_all();
    qte = await quote.review_quotes(req,res);
    await res.render('./admin/review_quotes.ejs', {emp: emp, cust: cust});
};

exports.create_employee = async function (req, res) {
    await res.render('./admin/create_employee.ejs');
};

exports.edit_employee = async function (req, res) {
    emp = await employee.employee_get_one(req,res);
    await res.render('./admin/edit_employee.ejs', {emp:emp});
};