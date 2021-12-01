const app = require('../app');
const { employee } = require('../db/models');

// This method is used to create a new employee
exports.employee_create = async function(req,res) {
    const {employee_name, user_name, password, address, role } = req.body;

    // Attempt to create employee, catch error if one occures
    try {
        const emp = await employee.create( {
            employee_name, user_name, password, address, role
        });
        return res.redirect('/dashboard/admin/manage_users');
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

// This method is used to update an existing employee
exports.employee_update = async function(req,res) {
    const {employee_name, user_name, password, address, role } = req.body;
    try {
        if(password === "") {
            const emp = await employee.update( {
                employee_name: employee_name,
                address: address,
                role: role
            },
            {where: {user_name: user_name}}
            );
            return res.redirect('/dashboard/admin/manage_users');    
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }
    // Attempt to create employee, catch error if one occures
    try {
        const emp = await employee.update( {
            employee_name: employee_name,
            password: password,
            address: address,
            role: role
        },
        {where: {user_name: user_name}}
        );
        return res.redirect('/dashboard/admin/manage_users');
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

// This method is used to delete an employee
exports.employee_delete = async function(req,res) {
    const id = req.params.id;

    // Attempt to create employee, catch error if one occures
    try {
        const emp = await employee.destroy({
            where: {id}
        });
        return res.redirect('/dashboard/admin');
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

//This method is used to get all employees from the employee table
exports.employee_get_all = async function (req, res) {
    try {
        const emp = await employee.findAll();
        return emp;
        return res.send(emp);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: 'Something went wrong' }, err);
    }
};

// This method is used to get one employee from the table
// Based on Employee user_name
exports.employee_get_one = async function(req,res) {
    const user_name = req.params.user_name; //store username param in user_name
    try {
        const emp = await employee.findOne({where: {user_name}});
        return emp;
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
        return emp;
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
            req.session.employee_name = emp.employee_name;
            req.session.user_name = emp.user_name;
            req.session.commission = emp.commission;
            req.session.role = emp.role;
            console.log('inside of chech: ', req.session)
            res.redirect('./dashboard/' + emp.role);
        } else {
            res.send('Failure');
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send(req.body);
    }
};
