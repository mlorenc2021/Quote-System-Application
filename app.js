//Import express module
const express = require('express');
//Import path module
const path = require('path');
//Import dotenv module
require('dotenv').config();

//invoke express function to create server
const app = express();

// Import static elements from public directory
app.use(express.static('./views'));

// If user is attempting to access a resource that doesn't exist
app.all('*', (req,res) => {
    res.status(404).send('error 404');
});


//Set server to lisen on port 3000
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

