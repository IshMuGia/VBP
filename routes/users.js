const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Act = require('../models/ActivityLog');
const multer = require('multer');
// Load User model
const User = require('../models/Users');
const Rank = require('../models/Rank');

//Email Connection
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "mushira.shaikh1999@gmail.com",
        pass: "Mushi_google99"
    }
});

//Register handle
router.post("/", (req, res) => {
    var name = req.body.name
    var phone = req.body.phone
    var email = req.body.email
    var bname = req.body.b_name
    var b_role = req.body.b_role
    var b_add = req.body.b_add
    var biz_size = req.body.size
    var password = req.body.password
    var img = req.body.image
    var message = '<p><span style="font-size: 17px;">Greetings <strong>' + name + '</strong>,</span></p><p>A new event has been created. Please fill your required details!</p><br><br><br>Regards,<br><strong>CSI-Management APP development team.</strong>'
/*
User.findOne({ email: req.body.email, biz_name: bname})
.then(user => {if (user) {} else {} });
*/
    User.findOne({ email: req.body.email/*, biz_name: bname*/})
    .then(user => {
        if (user) {
                const msg1 = "User Or Business already exists!";
                const msg = "";
                var rec = new Object();
                rec.msg1 = msg1;
                rec.msg = msg;
                res.render('myaccount', { rec: rec });

                console.log("email exists");
            } else {
                if (biz_size=="Small" || biz_size=="Medium")
                {
                    const newUser = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: name,
                        phone: phone,
                        email: email,
                        biz_name: bname,
                        biz_role: b_role,
                        biz_add: b_add,
                        biz_size: biz_size,
                        password: password,
                        tier:"3"
                    });
                    //hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            //Set password to hash
                            newUser.password = hash;
                            //Save user
                            newUser
                                .save()
                                .then(user => {
                                    req.session.email = req.body.email
                                    req.session.password = req.body.password
                                    req.session.uid = user._id;
                                    var currentDate = new Date();
                                    req.session.logdate = currentDate;
                                    //Create Log
                                    const newLog = new Act({
                                        email: req.session.email,
                                        login: currentDate
                                    });
                                    newLog
                                        .save() 
                                        .then(r => {
                                            var mailOptions = {
                                                from: 'mushira.shaikh1999@gmail.com',
                                                to: email,
                                                subject: 'Welcome to Analytics! – Thanks for joining us',
                                                html: message
                                                    //text: "Hello There!!!!! An event has been created pls fill your respective details"
                                            }
                                            transporter.sendMail(mailOptions, function(error, info) {
                                                if (error) {
                                                    console.log(error);
                                                    // res.sendStatus(400);
                                                } else
                                                    return res.redirect('/charts');
                                            });
                                            
                                        });
                                })
                        });
                    });
                }
                else {
                    Rank.findOne({ biz_name: bname})
                    .then(user1 => {
                        if (user1) {
                            const newUser = new User({
                                _id: new mongoose.Types.ObjectId(),
                                name: name,
                                phone: phone,
                                email: email,
                                biz_name: bname,
                                biz_role: b_role,
                                biz_add: b_add,
                                biz_size: biz_size,
                                password: password,
                                tier:"1"
                            });
                            //hash password
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(newUser.password, salt, (err, hash) => {
                                    if (err) throw err;
                                    //Set password to hash
                                    newUser.password = hash;
                                    //Save user
                                    newUser
                                        .save()
                                        .then(user => {
                                            req.session.email = req.body.email
                                            req.session.password = req.body.password
                                            req.session.uid = user._id;
                                            var currentDate = new Date();
                                            req.session.logdate = currentDate;
                                            //Create Log
                                            const newLog = new Act({
                                                email: req.session.email,
                                                login: currentDate
                                            });
                                            newLog
                                                .save() 
                                                .then(r => {
                                                    var mailOptions = {
                                                        from: 'mushira.shaikh1999@gmail.com',
                                                        to: email,
                                                        subject: 'Welcome to Analytics! – Thanks for joining us',
                                                        html: message
                                                            //text: "Hello There!!!!! An event has been created pls fill your respective details"
                                                    }
                                                    transporter.sendMail(mailOptions, function(error, info) {
                                                        if (error) {
                                                            console.log(error);
                                                            // res.sendStatus(400);
                                                        } else
                                                            return res.redirect('/charts');
                                                    });
                                                });
                                        })
                                });
                            });
                        } else {
                            const newUser = new User({
                                _id: new mongoose.Types.ObjectId(),
                                name: name,
                                phone: phone,
                                email: email,
                                biz_name: bname,
                                biz_role: b_role,
                                biz_add: b_add,
                                biz_size: biz_size,
                                password: password,
                                tier:"2"
                            });
                            //hash password
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(newUser.password, salt, (err, hash) => {
                                    if (err) throw err;
                                    //Set password to hash
                                    newUser.password = hash;
                                    //Save user
                                    newUser
                                        .save()
                                        .then(user => {
                                            req.session.email = req.body.email
                                            req.session.password = req.body.password
                                            req.session.uid = user._id;
                                            var currentDate = new Date();
                                            req.session.logdate = currentDate;
                                            //Create Log
                                            const newLog = new Act({
                                                email: req.session.email,
                                                login: currentDate
                                            });
                                            newLog
                                                .save() 
                                                .then(r => {
                                                    var mailOptions = {
                                                        from: 'mushira.shaikh1999@gmail.com',
                                                        to: email,
                                                        subject: 'Welcome to Analytics! – Thanks for joining us',
                                                        html: message
                                                            //text: "Hello There!!!!! An event has been created pls fill your respective details"
                                                    }
                                                    transporter.sendMail(mailOptions, function(error, info) {
                                                        if (error) {
                                                            console.log(error);
                                                            // res.sendStatus(400);
                                                        } else
                                                            return res.redirect('/charts');
                                                    });
                                                });
                                        })
                                });
                            });
                        }
                    });
 
                }
                               
            }
        });

});
module.exports = router;