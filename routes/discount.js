const express = require('express');
const router = express.Router();
const Quote = require('../models/Quotation_log');
const User = require('../models/Users');

//Email Connection
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "mushira.shaikh1999@gmail.com",
        pass: "Mushi_google99"
    }
});

router.get("/", (req, res) => {
    if (req.session.email) {
        var email = req.session.email;
        //var sol_name = req.body.sol;
        User.findOne({ email: email})
        .then(user => {

            console.log(user);
            var name = user.name;
            var message = '<p><span style="font-size: 17px;"> Dear <strong>' + name + '</strong>,</span></p> <p>Thank you so much for being a loyal customer! <p>To show our appreciation, we are pleased to offer you a discount on any of the solutions given on our website before the end of the year.<br><p>To claim this offer, just hit reply to this email requesting value based price of any solution and we will take <strong>30%</strong> off when we send the final invoice.<br><p>For more information about our services visit <a href= "http://3.93.242.13:5001/">Analytics</a><br><br><br>Sincerely,<br><strong>Team Analytics</strong>'
            var currentDate = new Date();
            const newLog = new Quote({
                email: email,
                Quote: currentDate
            });
            newLog
            .save()
            .then(r => {
                var mailOptions = {
                    from: 'mushira.shaikh1999@gmail.com',
                    to: email,
                    subject: 'Analytics | Special discount offer!! GRAB QUICKLY!'/* + sol_name*/,
                    html: message
                        //text: "Hello There!!!!! An event has been created pls fill your respective details"
                }
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                        // res.sendStatus(400);
                    } else
                        return res.redirect('/logout');
                });
                
            })
            .catch(err => console.log(err));     

        })
        .catch(err => console.log(err));
    } else {
        res.redirect("/myaccount");
    }
    
});


module.exports = router;