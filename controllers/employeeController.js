const { employee } = require('../db/models');

// This method is used to create a new employee
exports.employee_create = async function(req,res) {
    const {employee_name, user_name, password, address, role } = req.body;

    // Attempt to create employee, catch error if one occures
    try {
        const emp = await employee.create( {
            employee_name, user_name, password, address, role
        });
        return res.redirect('/login');
        return res.send(emp);
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }

};

//This method is used to get all employees from the employee table
exports.employee_get_all = async function(req,res) {
    try {
        const emp = await employee.findAll();
        return res.send(emp);
    } catch(err) {
        console.log(err);
        return res.status(500).send({error: 'Something went wrong'}, err);
    }
};

// This method is used to get one employee from the table
// Based on Employee user_name
exports.employee_get_one = async function(req,res) {
    const user_name = req.params.user_name; //store username param in user_name
    try {
        const emp = await employee.findOne({where: {user_name}});
        return res.send(emp);
    } catch(err) {
        console.log(err);
        return res.status(500).send({error: 'Something went wrong'}, err);
    }
};

// This method is used to get one employee from the table
// Based on Employee user_name
exports.employee_get_one = async function(req,res) {
    const user_name = req.params.user_name; //store username param in user_name
    try {
        const emp = await employee.findOne({where: {user_name}});
        return res.send(emp);
    } catch(err) {
        console.log(err);
        return res.status(500).send({error: 'Something went wrong'}, err);
    }
};

// This method is used to get one employee from the table
// Based on Employee user_name
exports.employee_check_credentials = async function(req,res) {
    const { user_name, password } = req.body; //store username and pass 
    try {
        const emp = await employee.findOne({where: {user_name}});
        const success = await emp.validPassword(password, emp.password);
        if(success) {
            res.send('Success');
        } else {
            res.send('Failure');
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send(req.body);
    }
};
