const express = require('express');
const router = express.Router();
const Quote = require('../models/Quotation_log');
const User = require('../models/Users');
const pdfkit = require('pdfkit');
const fs = require('fs')




//Email Connection
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "elex.buyanalytics@gmail.com",
        pass: "Elexanalytic098"
    }
});

router.get("/", (req, res) => {
    if (req.session.email) {
        var email = req.session.email;
        //var sol_name = req.body.sol;
        User.findOne({ email: email})
        .then(user => {
            var currentDate = new Date();
            var date = currentDate.getDate()+"/"+currentDate.getMonth()+"/"+currentDate.getFullYear()
            // console.log(user);
            var name = user.name;
            var b_name = user.biz_name;

            //create quote.pdf
            
            const a = new pdfkit
			a.pipe(fs.createWriteStream(__dirname + "/quote_".concat(name).concat(".pdf")));
            a.image( __dirname + '/img/logo.png', {
                fit: [150, 150],
                align: 'left',
                valign: 'top'
              });
              a.moveDown(2);
            a.fontSize(10)
                .text("Email: elex.buyanalytics@gmail.com",{align: 'left'})
                .text("Phone no: 9967937644",{align: 'left'})
                .text("Date: " + date,{align: 'right'})
			a.moveDown(2);
            a.text("Bill To:",{align: 'left'})
			a.font('Helvetica').fontSize(10).text("Name: "+name,{align: 'left'})
            a.font('Helvetica').fontSize(10).text("Company: "+b_name,{align: 'left'})
			a.moveDown(2);
            a.image( __dirname + '/img/quote.png', {
                fit: [400,400],
                align: 'center',
                valign: 'top'
              });
              a.moveDown(2);
            a.font('Helvetica').fontSize(10).text("We are happy to arrange a call and a meeting for our further discussion on this matter. Page 2 contains a summary of sample data of 4 users given for your reference. If there are any queries concerning this quotation or the sample customer data, please send us an email at elex.buyanalytics@gmail.com",{align: 'left'})
            a.moveDown(2);
            a.font('Helvetica').fontSize(10).text("Disclaimer: The information contained in these documents is confidential, privileged and only for the information of the intended recipient and may not be used, published or redistributed without the prior written consent of Analytics Managers.",{align: 'left'})
			a.addPage()
            a.image( __dirname + '/img/pg2.png', {
                fit: [500,500],
                align: 'left',
                valign: 'top'
              });
            a.moveDown(2);
            a.font('Helvetica').fontSize(10).text("Disclaimer: The information contained in these documents is confidential, privileged and only for the information of the intended recipient and may not be used, published or redistributed without the prior written consent of Analytics Managers.",{align: 'left'})
			
            // a.font('Helvetica-Bold').fontSize(15).text('Name: ', {continued:true}).font('Helvetica').text (result[0].name)
			// a.moveDown();
			// a.font('Helvetica-Bold').text('Theme: ', {continued:true}).font('Helvetica').text (result[0].theme)
			// a.moveDown();
			// a.font('Helvetica-Bold').text('Description: ', {continued:true}).font('Helvetica').text (result[0].description)
			// a.moveDown();
			// a.font('Helvetica-Bold').text('Event Date: ', {continued:true}).font('Helvetica').text (result[0].event_date)
			// a.moveDown();
			// a.font('Helvetica-Bold').text('Venue: ', {continued:true}).font('Helvetica').text (result[0].venue)
			// a.moveDown();
			// a.font('Helvetica-Bold').text('Speaker: ', {continued:true}).font('Helvetica').text (result[0].speaker)
			// a.moveDown();
			// a.font('Helvetica-Bold').text('Finance Summary ')
			// a.font('Helvetica').text('Registration fee for CSI members: ',{continued:true}).font('Helvetica').text (result[0].reg_fee_c)
			// a.moveDown(2);
			// a.text('Registration fee for Non-CSI members: ', {continued:true}).font('Helvetica').text (result[0].reg_fee_nc)
			// a.moveDown(2);
			// a.font('Helvetica-Bold').text('Prize: ', {continued:true}).font('Helvetica').text (result[0].prize)
			// a.moveDown();
            a.end()
            // var file = 'report/'.concat(result[0].name).concat('.pdf');
			// var data=fs.readFileSync(file);

            var  file='quote_'+name+'.pdf'
            var message = '<p><span style="font-size: 17px;"> Dear <strong>' + name + '</strong>,</span></p><p>Thank you for your inquiry regarding our service. We are pleased to satisfy your request with the attached document below.</p><p>In case you would like to get more information, we are happy to arrange a call and a meeting for our further discussion on this matter. We look forward to hearing from you.<br><br><p>For further queries email us at <a href="elex.BuyAnalytics@gmail.com">elex.BuyAnalytics@gmail.com</a></p></p>For more information about our services visit <a href= "http://3.93.242.13:5001/">Analytics</a><br><br><br>Sincerely,<br><strong>Team Analytics</strong>'
            
            const newLog = new Quote({
                email: email,
                Quote: currentDate
            });
            newLog
            .save()
            .then(r => {
                // console.log(__dirname);
                var mailOptions = {
                    from: 'elex.buyanalytics@gmail.com',
                    to: email,
                    subject: 'Analytics | VBP inquiry:'/* + sol_name*/,
                    html: message,
                    attachments:[{
                        filename: file,
                        path: __dirname + '/'+file 
                    }]
                        //text: "Hello There!!!!! An event has been created pls fill your respective details"
                }
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                        // res.sendStatus(400);
                    } else
                       { 
                           console.log("Mail sent Quote");
                           //return res.redirect('/logout');
                    }
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