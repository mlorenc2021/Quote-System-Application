const { quote } = require('../db/models');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

//apis for quotes
exports.quote_create = async function(req,res) {
    const {
        line_items, 
        user_name, 
        price, 
        discount, 
        status, 
        secret, 
        cust_email, 
        customer
    } = req.body;

    // Attempt to create employee, catch error if one occures
    try {
        const qte = await quote.create( {
            line_items, 
            user_name, 
            price, 
            discount,
            status,
            secret,
            cust_email,
            customer
        });
        return res.send(qte);
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

// api to get alll quotes
exports.quote_get_all = async function(req,res) {
    try {
        const qte = await quote.findAll();
        return qte;
    } catch(err) {
        console.log(err);
        return res.status(500).send({error: 'Something went wrong'}, err);
    }
};

// API to get an quote based on aployee user_name
exports.quote_get_all_for_user = async function(req,res) {
    const user_name = req.params.user_name; //store username param in user_name
    try {
        const qte = await quote.findAll({where: {user_name}});
        return qte;
    } catch(err) {
        console.log(err);
        return res.status(500).send({error: 'Something went wrong'}, err);
    }
};

// API for reviewing quotes based on custom query
exports.review_quotes = async function(req,res) {
    const {
        start_date,
        end_date,
        status,
        user_name,
        customer
    } = req.body;
    // const start_date = req.body.start_date;
    // const end_date = req.body.end_date;
    // const status = req.body.status;
    // const user_name = req.body.user_name;
    // const customer = req.body.customer;

    // Create a map for key value pairs
    let query_map = new Map();

    // If the req.body variable is not a default value we add it to the map
    if(start_date != '' && undefined) {
        query_map.set('start_date', start_date);
    }

    // If the req.body variable is not a default value we add it to the map
    if(end_date != '' && undefined) {
        query_map.set('end_date', end_date);
    }

    // If the req.body variable is not a default value we add it to the map
    if(user_name != '' && undefined) {
        query_map.set('user_name', user_name);
    }

    // If the req.body variable is not a default value we add it to the map
    if(status != '' && undefined) {
        query_map.set('status', status);
    }

    // If the req.body variable is not a default value we add it to the map
    if(customer != '' && undefined) {
        query_map.set('customer', customer);
    }

    // Convert the map to a javascript object to pass into findAll as a param
    const query_object = Object.fromEntries(query_map);

    try {
        const qte = await quote.findAll({
            // Pass the Javascript Object from above in as the where clause
            where: query_object
        })
        return qte;
    } catch(err) {
        console.log(err);
        return res.status(500).send({error: 'Something went wrong'}, err);
    }
};

// API to promote a quote
exports.finalize_quote = async function(req,res) {
    const id = req.params.id; //store id param in user_name

    //First check if the quote is a draft
    try {
        const qte = await quote.findOne({where: {id}});
        if (qte.status != 'draft') {
            res.send('This quote is not a draft, please contact your manager');
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send({error: 'Something went wrong'}, err);
    }
    //Then we can promote the quote
    try {
        quote.update(
            {status: 'finalized'},
            {where: {id: id}}
        )
        return res.send();
    } catch(err) {
        console.log(err);
        return res.status(500).send({error: 'Something went wrong'}, err);
    }
};

// API to promote a quote
exports.sanction_quote = async function(req,res) {
    const id = req.params.id; //store id param in user_name
    //First check if the quote can be promoted
    try {
        const qte = await quote.findOne({where: {id}});
        if (qte.status != 'finalized') {
            res.send('This quote is not a finalized quote, please contact your manager');
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send({error: 'Something went wrong'}, err);
    }
    //Then we can promote the quote
    try {
        quote.update(
            {status: 'sanctioned'},
            {where: {id: id}}
        )
        return res.send();
    } catch(err) {
        console.log(err);
        return res.status(500).send({error: 'Something went wrong'}, err);
    }
};

// API to promote a quote
exports.purchase_order = async function(req,res) {
    const id = req.params.id; //store id param in user_name
    //First check if the quote can be promoted
    try {
        const qte = await quote.findOne({where: {id}});
        if (qte.status != 'sanctioned') {
            res.send('This quote is not a finalized quote, please contact your manager');
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send({error: 'Something went wrong'}, err);
    }
    //Then we can promote the quote
    try {
        quote.update(
            {status: 'purchase_order'},
            {where: {id: id}}
        )
        return res.send();
    } catch(err) {
        console.log(err);
        return res.status(500).send({error: 'Something went wrong'}, err);
    }
};