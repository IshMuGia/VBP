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

            //create quote.pdf
            
            // const a= new pdfkit
			// a.pipe(fs.createWriteStream("report/".concat(result[0].name).concat(".pdf")));
			// a.fontSize(15).text("Don Bosco Institute of Technology, Kurla(W)",{align: 'center'})
			// a.text("Department of Information Technology",{align: 'center'})
			// a.moveDown(2);
			// a.font('Helvetica-Bold').fontSize(30).text(result[0].name,{align: 'center'})
			// a.moveDown();
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
            // a.end()
            // var file = 'report/'.concat(result[0].name).concat('.pdf');
			// var data=fs.readFileSync(file);


            var message = '<p><span style="font-size: 17px;"> Dear <strong>' + name + '</strong>,</span></p><p>Thank you for your inquiry regarding our service. We are pleased to satisfy your request with the attached document below.</p><p>In case you would like to get more information, we are happy to arrange a call and a meeting for our further discussion on this matter. We look forward to hearing from you.<br><br><p>For further queries email us at <a href="elex.BuyAnalytics@gmail.com">elex.BuyAnalytics@gmail.com</a></p></p>For more information about our services visit <a href= "http://3.93.242.13:5001/">Analytics</a><br><br><br>Sincerely,<br><strong>Team Analytics</strong>'
            var currentDate = new Date();
            const newLog = new Quote({
                email: email,
                Quote: currentDate
            });
            newLog
            .save()
            .then(r => {
                console.log(__dirname);
                var mailOptions = {
                    from: 'mushira.shaikh1999@gmail.com',
                    to: email,
                    subject: 'Analytics | VBP inquiry:'/* + sol_name*/,
                    html: message,
                    attachments:[{
                        filename: 'quote.pdf',
                        path: __dirname + '/quote.pdf' 
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
                           return res.redirect('/logout');
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