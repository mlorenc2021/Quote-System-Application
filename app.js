const express = require('express'); //Import express module
const path = require('path'); //Import path module
require('dotenv').config(); //Import dotenv module
const nodemailer = require('nodemailer');// Import nodemailer
const { sequelize, employee } = require('./db/models');

//invoke express function to create server
const app = express();

app.use(express.static('./views')); // Import static elements from views 
app.use(express.json()); // This allows easy use for exporting to json format

// API to create an employee
app.post('/employees', async(req,res) => {
    const {employee_name, user_name, password, address, role } = req.body;

    // Attempt to create employee, catch error if one occures
    try {
        const emp = await employee.create( {
            employee_name, user_name, password, address, role
        });
        return res.json(emp);
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// API to get all employees from employees table
app.get('/employees', async(req,res) => {
    try {
        const emp = await employee.findAll();
        return res.json(emp);
    } catch(err) {
        console.log(err);
        return res.status(500).json({error: 'Something went wrong'}, err);
    }
});

// API to get an employee based on user_name
app.get('/employees/:user_name', async(req,res) => {
    const user_name = req.params.user_name; //store username param in user_name
    try {
        const emp = await employee.findOne({where: {user_name}});
        return res.json(emp);
    } catch(err) {
        console.log(err);
        return res.status(500).json({error: 'Something went wrong'}, err);
    }
});

//Middleware
app.get('/contact', (req, res)=>{
    res.sendFile(__dirname + '/views/contact.html')
})

//POST API for the contact page form
app.post('/contact', (req, res)=>{
    console.log(req.body)

    //pass email details
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.PROJECTEMAIL,
            pass: process.env.PROJECTPASS
        }
    })

    //pass submission fields to email receiver
    const mailOptions = {
        from: req.body.email,
        to: process.env.PROJECTEMAIL,
        subject: `Message from' ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    //send error or success to frontend upon message submission
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })

})

// If user is attempting to access a resource that doesn't exist
app.all('*', (req,res) => {
    res.status(404).send('error 404');
});

//Set server to lisen on port 3000
app.listen({port: 3000}, async () => {
    console.log('Server is listening on port 3000');
    await sequelize.authenticate();
});

