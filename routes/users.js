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
    var currentDate = new Date();
    var message = '<p><span style="font-size: 17px;"> Dear <strong>' + name + '</strong>,</span></p><p>Your new Analytics Account has been created. Thank you for creating your account with us. With this account, you can browse through the website by viewing various solutions, bookmark, and rate your favorite solutions. Finally request a value-based price to get detailed insights on your customers to help your business grow.</p><p><br />To&nbsp;activate your account,&nbsp;click&nbsp;<a href="http://3.93.242.13:5001/">Analytics</a>.<br />If you did not create an account, or if you have any questions, please email us at <a href="elex.BuyAnalytics@gmail.com"> elex.BuyAnalytics@gmail.com</a><br /><br />Sincerely,<br /><strong>Team Analytics</strong></p>'
    var msg1, msg, rec
    rec = new Object();
  //  'p><span style="font-<size: 17px;">Greetings <strong>' + name + '</strong>,</span></p><p>A new event has been created. Please fill your required details!</p><br><br><br>Regards,<br><strong>CSI-Management APP development team.</strong>'
/*
User.findOne({ email: req.body.email, biz_name: bname})
.then(user => {if (user) {} else {} })
.catch(err => console.log(err));      
*/  if(password.length < 8){
        msg1 = "Password length should be minimum 8 character";
        msg = "";
        rec.msg1 = msg1;
        rec.msg = msg;
        res.render('myaccount', { rec: rec });
        console.log("Pass Length");
    }
    else{ 
        User.findOne({email: req.body.email})
        .then(user => {
        if (user) {
                msg1 = "User Or Business already exists!";
                msg = "";
                rec.msg1 = msg1;
                rec.msg = msg;
                res.render('myaccount', { rec: rec });
                console.log("email exists");
            }else{
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
                        biz_tier:"3",
                        reg_date: currentDate,
                        logins: "1"
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
                                                subject: 'Welcome to Analytics! Activation Mail',
                                                html: message
                                                    //text: "Hello There!!!!! An event has been created pls fill your respective details"
                                            }
                                            transporter.sendMail(mailOptions, function(error, info) {
                                                if (error) {
                                                    console.log(error);
                                                    // res.sendStatus(400);
                                                } else{
                                                    msg1 = "Activation Mail has been sent, Please Check your inbox!";
                                                    msg = "";
                                                    rec.msg1 = msg1;
                                                    rec.msg = msg;
                                                    res.render('myaccount', { rec: rec });
                                                }
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
                                biz_tier:"1",
                                reg_date: currentDate,
                        logins: "1"
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
                                                        subject: 'Welcome to Analytics! Activation Mail',
                                                        html: message
                                                            //text: "Hello There!!!!! An event has been created pls fill your respective details"
                                                    }
                                                    transporter.sendMail(mailOptions, function(error, info) {
                                                        if (error) {
                                                            console.log(error);
                                                            // res.sendStatus(400);
                                                        } else
                                                        {
                                                            msg1 = "Activation Mail has been sent, Please Check your inbox!";
                                                            msg = "";
                                                            rec.msg1 = msg1;
                                                            rec.msg = msg;
                                                            res.render('myaccount', { rec: rec });
                                                        }
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
                                biz_tier:"2",
                                reg_date: currentDate,
                        logins: "1"
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
                                                        subject: 'Welcome to Analytics! Activation Mail',
                                                        html: message
                                                            //text: "Hello There!!!!! An event has been created pls fill your respective details"
                                                    }
                                                    transporter.sendMail(mailOptions, function(error, info) {
                                                        if (error) {
                                                            console.log(error);
                                                            // res.sendStatus(400);
                                                        } else
                                                        {
                                                            msg1 = "Activation Mail has been sent, Please Check your inbox!";
                                                            msg = "";
                                                            rec.msg1 = msg1;
                                                            rec.msg = msg;
                                                            res.render('myaccount', { rec: rec });
                                                        }
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
    }
});
module.exports = router;