//Import express module
const express = require('express');
//Import path module
const path = require('path');
//Import dotenv module
require('dotenv').config();

//invoke express function to create server
const app = express();

const nodemailer = require('nodemailer');

// Import static elements from public directory
app.use(express.static('./views'));
app.use(express.json())

//Middleware
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/contact.html')
})

app.post('/', (req, res)=>{
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
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

