const express = require('express'); //Import express module
const path = require('path'); //Import path module
require('dotenv').config(); //Import dotenv module
const axios = require('axios');
const {randomUUID} = require('crypto');

// Database imports
const {hq_db, legacy_db} = require('./db/models');

// Routes Imports
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const employeeRoutes = require('./routes/employee_api');
const quoteRoutes = require('./routes/quote_api');
const dashboardRoutes = require('./routes/dashboard');
const customerRoutes = require('./routes/customer_api');

//invoke express function to create server
const app = express();
const session = require('express-session');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
// Express session middleware
app.use(function (req, res, next)  {
    // Check if we've already initialised a session
    if (!req.session.initialised) {
       // Initialise our variables on the session object (that's persisted across requests by the same user
       req.session.initialised = true;
       req.session.employee_name;
       req.session.user_name;
       req.session.commission;
       req.session.role;
    }
    next();
 });
app.use(express.urlencoded());
app.use(express.static("public"));
app.set('view-engine', 'ejs');
app.use(express.json()); // This allows easy use for exporting to json format

app.use('/', indexRouter);
app.use('/login', loginRouter);

app.use('/dashboard', dashboardRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/customer', customerRoutes);

app.post('/process_test', (req,res) => {
axios
    .post('http://blitz.cs.niu.edu/PurchaseOrder/',{
        "order": randomUUID(),
        "associate": "2",
        "custid": "21",
        "amount": "1234.56"
    }).then(res => {
        console.log(`status code: ${res.status}`)
        console.log(res.data)
        console.log(res.data.commission)
    }).catch(error => {
        console.error(error)
    })
    res.end();
})

// If user is attempting to access a resource that doesn't exist
app.use((req,res) => {
    res.status(404).send('error 404');
});

//Set server to lisen on port 3000
app.listen({port: 3000}, async () => {
    console.log('Server is listening on port 3000');
    await hq_db.authenticate();
    await legacy_db.authenticate();
});

module.exports = app