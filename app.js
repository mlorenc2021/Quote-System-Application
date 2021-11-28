const express = require('express'); //Import express module
const path = require('path'); //Import path module
require('dotenv').config(); //Import dotenv module
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
app.use(express.urlencoded());

app.use(express.static("public"));


app.set('view-engine', 'ejs');
app.use(express.json()); // This allows easy use for exporting to json format



app.use('/', indexRouter);
app.use('/login', loginRouter);

// Registration get request
// Registration routes are temporary as functionality will eventuall
// be moved to the admin interface page
app.get('/register', (req,res) => {
    res.render('register.ejs');
});

app.use('/dashboard', dashboardRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/customer', customerRoutes);

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