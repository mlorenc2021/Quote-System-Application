const { customer } = require('../db/models');

// find all customers
exports.customer_get_all = async function(req, res) {
    try {
        const cust = await customer.findAll();
        return res.send(cust);
    } catch(err) {
        console.log(err);
        return res.status(500).send(req.body, err);
    }
};