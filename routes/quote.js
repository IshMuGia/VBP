const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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
            var message = '<p><span style="font-size: 17px;"> Dear <strong>' + name + '</strong>,</span></p><p>Thank you for your inquiry regarding our service. We are pleased to satisfy your request with the attached document below.</p><p>In case you would like to get more information, we are happy to arrange a call and a meeting for our further discussion on this matter. We look forward to hearing from you.<br><br><p>For further queries email us at <a href="elex.BuyAnalytics@gmail.com">elex.BuyAnalytics@gmail.com</a></p></p>For more information about our services visit <a href= "http://3.93.242.13:5001/">Analytics</a><br><br><br>Sincerely,<br><strong>Team Analytics</strong>'
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
                    subject: 'Analytics | VBP inquiry:'/* + sol_name*/,
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