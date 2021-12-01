const { quote, line_item, secret_note} = require('../db/models');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

//apis for quotes
exports.quote_create = async function(req,res) {
    const {
        id,
        user_name, 
        total, 
        status, 
        cust_email, 
        customer,
        line_items,
        price,
        secret
    } = req.body;
    // Used to store the line item and objects together as objects
    let line_item_list = [];
    let secret_list = [];
    // req.body.iterateProperties((key, value) => console.log(key + ': ' + value)



    // Attempt to create employee, catch error if one occures
    try {
        const qte = await quote.upsert( {
            id,
            user_name, 
            total, 
            status,
            cust_email,
            customer,
        });

        if (line_items !== undefined){
            console.log("line items is", line_items)
            // Loop for line items add them to line_item list
            for(i = 0; i < line_items.length; i++) {
                const obj = {
                    quote_id: qte.id,
                    label: line_items[i],
                    price: price[i]
                }
                line_item_list.push(obj);
            }
        } else {
                line_item_list.push({
                    quote_id: qte.id,
                    label: line_items,
                    price: price
                });
        }

        // Loop over list of all line items to be added
        line_item_list.forEach(async function(obj) {
            const lineItem = await line_item.create(obj);
        });

        if(secret !== undefined){
            // Loop for secret notes and add them to secret_list
            for(i = 0; i < secret.length; i++) {
                const obj = {
                    quote_id: qte.id,
                    note: secret[i]
                }
                secret_list.push(obj);
            }
        } else {
                secret_list.push({
                    quote_id: qte.id,
                    note: secret
                });
        }

        // Loop over and add all secret notes
        secret_list.forEach(async function(obj) {
            const secret = await secret_note.create(obj);
        });

        return res.redirect('/dashboard/sales');
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }
};



//apis for quotes
exports.quote_update = async function(req,res) {
    const {
        quote_id,
        secret_id,
        line_item_id,
        user_name, 
        total, 
        status, 
        cust_email, 
        customer

    } = req.body;

    // Used to store the line item and objects together as objects
    let line_item_list = [];
    let secret_list = [];

    const line_items = [];//labels
    const price = [];
    const line_items_ids = [];

    const secret = [];//notes
    const secret_ids = [];

    console.log("====================request body paramters==================")
    Object.keys(req.body).filter(key => req.body.hasOwnProperty(key)).forEach((key) => {
        const value = req.body[key];
        console.log(key + ': ' + value)

        if (key.startsWith("line_item_id_")) {
            line_items_ids.push(value);
        } 
        else if (key.startsWith("line_item_label_")) {
            line_items.push(value);
        } 
        else if (key.startsWith("price_")) {
            price.push(value);
        }
        else if (key.startsWith("secret_note_id_")) {
            secret_ids.push(value);
        }
        else if (key.startsWith("secret_note_note_")) {
            secret.push(value);
        }
 
    });

    // console.log("what is line item ids", line_items_ids)
    // console.log("what is line item label", line_items)
    // console.log("what is line item price", price)

    // Attempt to create employee, catch error if one occures
    try {
        let id = quote_id ? quote_id : null;
        
        console.log("quote id is ", id)
        const return_value = await quote.upsert( {
            id: id,
            user_name, 
            total, 
            status,
            cust_email,
            customer
        }, { returning: true });
        // console.log("return value is", return_value[0].dataValues)

        const qte = return_value[0].dataValues;

        // console.log("saved quote is", qte)

        if (line_items !== undefined) {
            // Loop for line items add them to line_item list
            for(i = 0; i < line_items.length; i++) {
                const obj = {
                    quote_id: qte.id,
                    id: line_items_ids[i],
                    label: line_items[i],
                    price: price[i]
                }
                line_item_list.push(obj);
            }
        }
        // console.log("new line item list", line_item_list)

        const old_line_items = await exports.get_line_items(quote_id);
        // console.log("old line items", old_line_items)
        const deleted_line_items = [];
        for(var i = 0; i < old_line_items.length; i++){
            const old_line_item = old_line_items[i].dataValues;
            // console.log("old line item is", old_line_item)
            let found = false;
            // console.log("line item list length", line_item_list.length)
            for(var e = 0; e < line_item_list.length; e++) {
            
                // console.log("line items element", line_item_list[e])
                if (line_item_list[e].id == old_line_item.id) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                // console.log("!found about to delete", old_line_item)
                await line_item.destroy({ where: { id: old_line_item.id } });
            }
        }

        // Loop over list of all line items to be added
        line_item_list.forEach(async function(obj) {
            console.log("upserting line item", obj)
            const lineItem = await line_item.upsert(obj);

        });


        if (secret !== undefined) {
            // Loop for secret notes and add them to secret_list
            for(i = 0; i < secret.length; i++) {
                const obj = {
                    quote_id: qte.id,
                    id: secret_ids[i],
                    note: secret[i]
                }
                secret_list.push(obj);
            }
        }

        const old_secret_notes = await exports.get_secret(quote_id);
        console.log("new secret note list", secret_list)
        console.log("old secret note list", old_secret_notes)
        
        for (var i = 0; i < old_secret_notes.length; i++) {
            const old_secret_note = old_secret_notes[i].dataValues;

            let found = false;

            for (var e = 0; e < secret_list.length; e++) {

                // console.log("line items element", line_item_list[e])
                if (secret_list[e].id == old_secret_note.id) {
                    found = true;
                    break;
                }
            }
            if (!found) {

                await secret_note.destroy({ where: { id: old_secret_note.id } });
            }
        }

        // Loop over and add all secret notes
        secret_list.forEach(async function(obj) {
            console.log("upserting secret note", obj)
            const secret = await secret_note.upsert(obj);
        });

        const referer = req.headers.referer;
        console.log("what is referer at account update", referer)
        const isUpdate = referer.indexOf("/update_quote") != -1;
        const isAccountantUpdate = referer.indexOf("/accountant/update_quote") != -1;
        const url = isUpdate ? (isAccountantUpdate ? '/dashboard/accountant' : '/dashboard/manager') : '/dashboard/sales';

        return res.redirect(url);
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

//apis for quotes
exports.delete_line_item = async function(req,res) {
    const {
        id,
    } = req.body;

    // Attempt to detel line item
    try {
        await line_item.destroy({where: {id}});
        return res.send('success');
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

//apis for quotes
exports.delete_secret_note = async function(req,res) {
    const {
        id,
    } = req.body;

    // Attempt to detel line item
    try {
        await secret_note.delete({where: {id}});
        return res.send('success');
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

// api to get alll quotes
exports.quote_get_one = async function(req,res) {
    const id = req.params.id;
    try {
        const qte = await quote.findOne({where: {id}});
        // console.log(qte)
        return qte;
    } catch(err) {
        console.log(err);
        return res.status(500).send({error: 'Something went wrong'}, err);
    }
};

// api to get alll quotes
exports.get_line_items = async function (quote_id) {
    console.log("getting items quote with id", quote_id)
    try {
        const line_items = await line_item.findAll({ where: { quote_id } });
        return line_items;
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: 'Something went wrong' }, err);
    }
};

// api to get alll quotes
exports.get_secret = async function(quote_id) {
    try {
        const secret_notes = await secret_note.findAll({where: {quote_id}});
        return secret_notes;
    } catch(err) {
        console.log(err);
        return res.status(500).send({error: 'Something went wrong'}, err);
    }
};

// api to get alll quotes
exports.quote_get_all_by_status = async function(status) {
    try {
        const qte = await quote.findAll({where: {status}});
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
        return res.redirect('/dashboard/sales');
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
        return res.redirect('/dashboard/manager');
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
        return res.redirect('/dashboard/accountant');
    } catch(err) {
        console.log(err);
        return res.status(500).send({error: 'Something went wrong'}, err);
    }
};
