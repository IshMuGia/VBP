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

function weeksBetween(d1, d2) {
    return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}

router.get("/", (req, res) => {
    
    if (req.session.email) {        
        var email = req.session.email;
        var currentDate = new Date();
        //var sol_name = req.body.sol;
        User.findOne({email: email})
        .then(user => {
            console.log(user);
            var name = user.name;
            var tier = user.biz_tier;
            var per;
            Interest = weeksBetween(user.reg_date, currentDate);
            if (Interest>7){ //VI
                return res.redirect('/logout');                      
            }
            else{
                if(tier==1){
                    if(Interest>3){ //MI
                       per="10" 
                   }
                   else { //NI
                       per="20"  
                   }
               }
               else if(tier==2){
                   if(Interest>3){ //MI
                       per="5" 
                   }
                   else { //NI
                       per="10"  
                   }
   
               }
               else {
                   if(Interest>3){ //MI
                       per="2.5" 
                   }
                   else { //NI
                       per="5"  
                   }
               }
            }
            
            message = '<p><span style="font-size: 17px;"> Dear <strong>' + name + '</strong>,</span></p> <p>Thank you so much for being a loyal customer! <p>To show our appreciation, we are pleased to offer you a discount on any of the solutions given on our website before the end of the year.<br><p>To claim this offer, just hit reply to this email requesting value based price of any solution and we will take '+per+'% off when we send the final invoice.<br><p>For more information about our services visit <a href= "http://3.93.242.13:5001/">Analytics</a><br><br><br>Sincerely,<br><strong>Team Analytics</strong>'
            var mailOptions = {
                from: 'mushira.shaikh1999@gmail.com',
                to: email,
                subject: 'Analytics | Special discount offer!! GRAB QUICKLY!'/* + sol_name*/,
                html: message,                
                attachments:[{
                    filename: 'sample.pdf',
                    path: __dirname + '/sample.pdf' 
                }]
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
        
    } else {
        res.redirect("/myaccount");
    }
    
});

module.exports = router;



        

            // var currentDate = new Date();
            // const newLog = new Quote({
            //     email: email,
            //     Quote: currentDate
            // });
            // newLog
            // .save()
            // .then(r => {
                
                
            // })
            // .catch(err => console.log(err));     
