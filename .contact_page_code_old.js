const nodemailer = require('nodemailer');// Import nodemailer

/*
 *  Contact page
 *  May be removed later
 */

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