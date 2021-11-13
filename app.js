const express = require('express'); //Import express module
const path = require('path'); //Import path module
require('dotenv').config(); //Import dotenv module
const nodemailer = require('nodemailer');// Import nodemailer
const { sequelize, employee, quote} = require('./db/models');

//invoke express function to create server
const app = express();
app.use(express.urlencoded());
const router = express.Router();
const employee_controller = require('./controllers/employeeController');
const quote_controller = require('./controllers/quotesController');

app.set('view-engine', 'ejs');
// app.use(express.static('./views')); // Import static elements from views 
app.use(express.json()); // This allows easy use for exporting to json format

app.get('/', (req,res) => {
    res.render('index.ejs');
});

app.get('/login', (req,res) => {
    res.render('login.ejs');
});

app.post('/login', employee_controller.employee_check_credentials);

app.get('/register', (req,res) => {
    res.render('register.ejs');
});

// API to create an employee
app.post('/employees', employee_controller.employee_create);

// API to get all employees from employees table
app.get('/employees', employee_controller.employee_get_all);

// API to get an employee based on user_name
app.get('/employees/:user_name', employee_controller.employee_get_one);


//apis for quotes
app.post('/quotes', quote_controller.quote_create);

// api to get alll quotes
app.get('/quotes', quote_controller.quote_get_all);

// API to get an quote based on aployee user_name
app.get('/quotes/:user_name', quote_controller.quote_get_all_for_user);

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

