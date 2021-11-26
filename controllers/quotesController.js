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
        return res.send(qte);
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
        return res.send(qte);
    } catch(err) {
        console.log(err);
        return res.status(500).send({error: 'Something went wrong'}, err);
    }
};

// API for reviewing quotes based on custom query
exports.review_quotes = async function(req,res) {
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const status = req.body.status;
    const user_name = req.body.user_name;
    const customer = req.body.customer;

    // const body = req.body;
    // console.log(body)

    let query_map = new Map();

    if(start_date != '') {
        query_map.set('start_date', start_date);
    }

    if(end_date != '') {
        query_map.set('start_date', start_date);
    }

    if(user_name != '') {
        query_map.set('user_name', user_name);
    }

    if(status != '') {
        query_map.set('status', status);
    }

    if(customer != '') {
        query_map.set('customer', customer);
    }

    const query_object = Object.fromEntries(query_map);

    try {
        const qte = await quote.findAll({
            where: query_object
        })
        return res.send(qte);
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