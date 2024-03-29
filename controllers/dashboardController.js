const employee = require('./employeeController');
const customer = require('./customerController');
const quote = require('./quotesController');


//sales dashboard and interfaces
exports.sales_dashboard = async function(req,res) {
    //Employee session information
    const employee_name = req.session.employee_name;
    const user_name = req.session.user_name;
    const commission = req.session.commission;
    const role = req.session.role;
    await res.render('./sales/sales_dashboard.ejs',{
        employee_name:employee_name,
        user_name:user_name,
        commission:commission,
        role:role
    });
};

exports.create_quote = async function (req, res) {
    qte = {id: null, user_name: '', total: 0, status: 'draft', cust_email: '', customer: ''};
    cust = await customer.customer_get_all();
    line_items = [];
    secret_notes = [];
    await res.render('./sales/edit_quote.ejs', {
        qte: qte,
        line_items: line_items,
        secret_notes: secret_notes,
        cust: cust,
        isUpdate: false,
        isAccountantUpdate: false
    });
};

exports.edit_quote = async function (req, res) {
    qte = await quote.quote_get_one(req,res);
    cust = await customer.customer_get_all();
    const isAccountantUpdate = req.route.path.startsWith("/accountant/update_quote");
    const isManagerUpdate = req.route.path.startsWith("/manager/update_quote");
    const isUpdate = isAccountantUpdate || isManagerUpdate;
    line_items = await quote.get_line_items(qte.id);
    secret_notes = await quote.get_secret(qte.id);
    await res.render('./sales/edit_quote.ejs', {
        qte:qte, 
        line_items:line_items, 
        secret_notes:secret_notes,
        cust:cust,
        isUpdate:isUpdate,
        isAccountantUpdate:isAccountantUpdate
    });
};

exports.finalize_quote = async function (req, res) {
    //Employee session information
    const employee_name = req.session.employee_name;
    const user_name = req.session.user_name;
    const commission = req.session.commission;
    const role = req.session.role;
    qte = await quote.quote_get_all_by_status_and_user_name(user_name, 'draft');
    await res.render('./sales/finalize_quote.ejs', {
        employee_name:employee_name,
        user_name:user_name,
        commission:commission,
        role:role
    });
};

//MANAGER dashboard and interfaces
exports.manager_dashboard = async function(req,res) {
    //Employee session information
    const employee_name = req.session.employee_name;
    const user_name = req.session.user_name;
    const role = req.session.role;
    await res.render('./manager/manager_dashboard.ejs', {
        employee_name:employee_name,
        user_name:user_name,
        role:role
    });
};

exports.update_quote = async function (req, res) {
    //Employee session information
    const employee_name = req.session.employee_name;
    const user_name = req.session.user_name;
    const commission = req.session.commission;
    const role = req.session.role;
    qte = await quote.quote_get_one(req, res);
    cust = await customer.customer_get_all();
    console.log('What is quote.id?:', qte.id);
    line_items = await quote.get_line_items(qte.id);
    secret_notes = await quote.get_secret(qte.id);
    await res.render('./manager/update_quote.ejs', {
        qte: qte,
        line_items: line_items,
        secret_notes: secret_notes,
        cust: cust,

        employee_name:employee_name,
        user_name:user_name,
        commission:commission,
        role:role
    });
};

exports.sanction_quote = async function (req, res) {
    //Employee session information
    const employee_name = req.session.employee_name;
    const user_name = req.session.user_name;
    const commission = req.session.commission;
    const role = req.session.role;
    qte = await quote.quote_get_all_by_status('finalized');
    await res.render('./manager/sanction_quote.ejs', {
        employee_name:employee_name,
        user_name:user_name,
        commission:commission,
        role:role
    });
};

//ACCOUNTANT dashboard and interfaces
exports.accountant_dashboard = async function(req,res) {
    //Employee session information
    const employee_name = req.session.employee_name;
    const user_name = req.session.user_name;
    await res.render('./accountant/accountant_dashboard.ejs', {
        employee_name:employee_name,
        user_name:user_name,
    });
};

exports.process_order = async function (req, res) {
    //Employee session information
    const employee_name = req.session.employee_name;
    const user_name = req.session.user_name;
    qte = await quote.quote_get_all_by_status('sanctioned');
    await res.render('./accountant/process_order.ejs', {
        employee_name:employee_name,
        user_name:user_name,
    });
};

//admin dashboard and interfaces
exports.admin_dashboard = async function(req,res) {
    //Employee session information
    const employee_name = req.session.employee_name;
    const user_name = req.session.user_name;
    await res.render('./admin/admin_dashboard.ejs', {
        employee_name:employee_name,
        user_name:user_name,
    });
};

exports.manage_users = async function (req, res) {
    //Employee session information
    const employee_name = req.session.employee_name;
    const user_name = req.session.user_name;
    // Use employee controller get all function to get the employee obj
    emp = await employee.employee_get_all();
    // Send the emp object to the admin page
    await res.render('./admin/manage_users.ejs', {
        emp: emp,
        employee_name:employee_name,
        user_name:user_name,
    });
};

exports.review_quotes = async function (req, res) {
    //Employee session information
    const employee_name = req.session.employee_name;
    const user_name = req.session.user_name;
    emp = await employee.employee_get_all();
    cust = await customer.customer_get_all();
    qte = await quote.review_quotes(req,res);
    await res.render('./admin/review_quotes.ejs', {
        emp: emp, 
        cust: cust,
        employee_name:employee_name,
        user_name:user_name,
    });
};

exports.create_employee = async function (req, res) {
    //Employee session information
    const employee_name = req.session.employee_name;
    const user_name = req.session.user_name;
    await res.render('./admin/create_employee.ejs', {
        employee_name:employee_name,
        user_name:user_name,
    });
};

exports.edit_employee = async function (req, res) {
    //Employee session information
    const employee_name = req.session.employee_name;
    const user_name = req.session.user_name;
    emp = await employee.employee_get_one(req,res);
    await res.render('./admin/edit_employee.ejs', {
        emp:emp,
        employee_name:employee_name,
        user_name:user_name,
    });
};