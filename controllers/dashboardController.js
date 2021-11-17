

//sales dashboard and interfaces
exports.sales_dashboard = async function(req,res) {
    await res.render('./sales/sales_dashboard.ejs');
};

exports.create_quote = async function (req, res) {
    await res.render('./sales/create_quote.ejs');
};

exports.finalize_quote = async function (req, res) {
    await res.render('./sales/finalize_quote.ejs');
};


//manager dashboard and interfaces
exports.manager_dashboard = async function(req,res) {
    await res.render('./manager/manager_dashboard.ejs');
};

exports.update_quote = async function (req, res) {
    await res.render('./manager/update_quote.ejs');
};

exports.sanction_quote = async function (req, res) {
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
    await res.render('./admin/manage_users.ejs');
};

exports.review_quotes = async function (req, res) {
    await res.render('./admin/review_quotes.ejs');
};