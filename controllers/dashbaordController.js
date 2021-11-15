exports.sales_dashboard = async function(req,res) {
    await res.render('sales_dashboard.ejs');
};

exports.manager_dashboard = async function(req,res) {
    await res.render('manager_dashboard.ejs');
};

exports.accountant_dashboard = async function(req,res) {
    await res.render('accountant_dashboard.ejs');
};

exports.admin_dashboard = async function(req,res) {
    await res.render('admin_dashboard.ejs');
};