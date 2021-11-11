const { quote } = require('../db/models');

//apis for quotes
exports.quote_create = async function(req,res) {
    const {line_items, user_name, price, discount} = req.query;

    // Attempt to create employee, catch error if one occures
    try {
        const qte = await quote.create( {
            line_items, user_name, price, discount
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