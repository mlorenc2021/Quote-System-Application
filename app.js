const express = require('express'); //Import express module
const path = require('path'); //Import path module
require('dotenv').config(); //Import dotenv module
const { sequelize } = require('./db/models');

// Routes Imports
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const employeeRoutes = require('./routes/employee_api');

// Controllers Imports
const employee_controller = require('./controllers/employeeController');
const quote_controller = require('./controllers/quotesController');

//invoke express function to create server
const app = express();
app.use(express.urlencoded());


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

app.use('/api/employees', employeeRoutes);


/*
 *   API's for qoutes
 */

//apis for quotes
app.post('/quotes', quote_controller.quote_create);

// api to get alll quotes
app.get('/quotes', quote_controller.quote_get_all);

// API to get an quote based on aployee user_name
app.get('/quotes/:user_name', quote_controller.quote_get_all_for_user);


// If user is attempting to access a resource that doesn't exist
app.use((req,res) => {
    res.status(404).send('error 404');
});

//Set server to lisen on port 3000
app.listen({port: 3000}, async () => {
    console.log('Server is listening on port 3000');
    await sequelize.authenticate();
});

module.exports = app