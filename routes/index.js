const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Sol = require('../models/solutions');
const Rev = require("../models/Review");
const Wishlist = require('../models/Wishlist');
const Act = require('../models/ActivityLog');

router.get("/", (req, res) => {
    if (req.session.email) {
        res.redirect('/charts');
    } else {
        res.redirect("/myaccount");
    }

});

router.get("/myaccount", (req, res) => {
    if (req.session.email) {
        res.redirect('/');

    } else {
        const msg1 = "";
        const msg = "";
        var rec = new Object();
        rec.msg1 = msg1;
        rec.msg = msg;
        res.render('myaccount', {
            rec: rec
        });
    }
});

router.get("/Vcharts", (req, res) => {
    Sol.find({
        brand: req.query.brand
    },'-_id')
    .exec()
    .then(results0 => {
        Sol.find({},'brand -_id')
        .exec()
        .then(results1=>{
            results1 = results1.slice(1);
            const results = results0.concat(results1)
            console.log(results);
            res.render('charts', {
                results: results
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });        
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.get("/Vcharts", (req, res) => {
    Sol.find({
        brand: req.query.brand
    },'-_id')
    .exec()
    .then(results0 => {
        Sol.find({},'brand -_id')
        .exec()
        .then(results1=>{
            results1 = results1.slice(1);
            const results = results0.concat(results1)
            console.log(results);
            res.render('powerbi', {
                results: results
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });        
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.get("/charts", (req, res) => {
    Sol.find({
        brand: "None"
    })
    .exec()
    .then(results0 => {
        Sol.find({},'brand -_id')
        .exec()
        .then(results1=>{
            results1 = results1.slice(1);
            const results = results0.concat(results1)
            console.log(results);
            res.render('charts', {
                results: results
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });  
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/logout', (req, res) => {
    const currentDate = new Date();
    const lin = new Date(req.session.logdate);
    console.log("login " + lin + " Logout " + currentDate)

    duration= (Math.abs(currentDate.getTime() - lin.getTime()))/1000;
    //console.log(timeDifference);        
    var myquery = {
        email: req.session.email
    };
    var newvalues = {
        $set: {
            logout: currentDate, duration: duration
        }
    };
    Act.findOneAndUpdate(myquery, newvalues, {new: true}
        )
        .then(result => {
            console.log(result)
            req.session.destroy((err) => {
                if (err) {
                    return console.log(err);
                }
                res.redirect('/');
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get("/addtowishlist", (req, res) => {
    var email = req.session.email;
    var brand = req.query.brand;
    Wishlist.findOne({
            email: email,
            brand: brand
        })
        .then(exist => {
            if (!exist) {
                s = 0;
                const newwish = new Wishlist({
                    _id: new mongoose.Types.ObjectId(),
                    brand: brand,
                    email: email,
                });
                console.log("newwish obj created")
                newwish
                    .save()
                    .then(wishlist => {
                        console.log("wishlist added")
                        res.redirect('/wishlist');
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            } else if (exist) {
                s = 1;
                Sol.find({
                    brand: req.query.brand
                })
                .exec()
                .then(results => {
                    console.log(results);
                    res.render('charts', {
                        results: results
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get("/removefromwishlist", (req, res) => {
    var email = req.session.email;
    var brand = req.query.brand;
    Wishlist.findOneAndRemove({
            email: email,
            brand: brand
        }).then(results => {
            console.log("Removed from Wishlist");
            res.redirect('/wishlist');            
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get("/wishlist", (req, res) => {
    var email = req.session.email;
    Wishlist.find({
            email: email
        }, 'brand -_id')
        .exec()
        .then(docs1 => {
            Sol.find({},'brand logo s_desc solution -_id')
                .where('brand')
                .in(docs1.map(i => i.brand))
                .exec()
                .then(records => {
                    console.log(records);
                    res.render("wishlist",{
                        results: records
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get("/shop", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("shop");
});

router.get("/product", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("product");
});

router.get("/powerbi", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("powerbi");
});

router.get("/wishlist", (req, res) => {
    // return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });
    res.render("wishlist");
});

// Category Shop
// router.get("/categoryshop", (req, res) => {

//     Prod.find({
//             category: req.query.category
//         })
//         .exec()
//         .then(results => {
//             console.log(results);
//             if (results) {
//                 res.render("shop", {
//                     results: results
//                 });
//             } else {
//                 console.log("Empty")
//             }
//         })
//         .catch(err => console.log(err));
// });

// router.get("/dproduct", (req, res) => {
//     const id = req.query.id;
//     console.log(id)
//     Prod.find({
//             model_no: id
//         })
//         .exec()
//         .then(docs1 => {
//             //console.log(docs1);
//             Prod.find({
//                     brand: docs1[0].brand
//                 })
//                 .exec()
//                 .then(rel => {

//                     rel = rel.slice(0, 6);
//                     //console.log(rel.length);
//                     const docs = docs1.concat(rel)
//                     docs[7] = {
//                         "alert": "Save Product"
//                     };

//                     Rev.find({
//                             product: id
//                         })
//                         .exec()
//                         .then(docs2 => {
//                             //console.log("ksddhlkf");
//                             const document = docs.concat(docs2)
//                             //console.log(document)
//                             console.log(document.length);
//                             res.render('product', {
//                                 results: document
//                             });
//                         })
//                         .catch(err => {
//                             res.status(500).json({
//                                 error: err
//                             });
//                         });

//                 })
//                 .catch(err => {
//                     res.status(500).json({
//                         error: err
//                     });
//                 });

//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             });
//         });
// });

// Category Shop
// router.post("/categoryshop", (req, res) => {
//     Prod.find({
//             category: req.body.category
//         }, 'brand category sub_brand mrp _id')
//         .exec()
//         .then(results => {
//             console.log("lolvhgndk");
//             console.log(results);
//             if (results) {
//                 res.render("shop", {
//                     results: results
//                 });
//             } else {
//                 console.log("Empty")
//             }
//         })
//         .catch(err => console.log(err));
// });

// router.get("/addtocart", (req, res) => {
//     const email = req.query.email;
//     console.log(email)
//     Cart.find({
//             model_no: email
//         }, 'email model_no')
//         .exec()
//         .then(docs1 => {
//             Prod.find({
//                     product: id
//                 })
//                 .exec()
//                 .then(docs2 => {
//                     const docs = docs1.concat(docs2)
//                     RT - AC86U
//                     console.log(docs)
//                     res.status(200).json({
//                         results: docs
//                     });
//                 })
//                 .catch(err => {
//                     res.status(500).json({
//                         error: err
//                     });
//                 });
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             });
//         });
// });

//res.redirect('/logged/?uid=' + req.query.uid);
// router.get("/logged", (req, res) => {
//     if (req.session.email) {
//         res.redirect('/charts');
//     } else {
//         res.redirect("/myaccount")
//     }
// });

// SubBrand Shop
// router.get("/subbrandshop", (req, res) => {
//     Prod.find({
//             sub_brand: req.query.sub_brand
//         })
//         .then(results => {
//             if (results) {
//                 console.log(results);
//                 res.render("shop", {
//                     results: results
//                 });
//             } else {
//                 console.log("Empty")
//             }
//         })
//         .catch(err => console.log(err));
// });

// router.get("/logged", (req, res) => {
//     if (req.session.email) {
//         Prod.find({}, 'brand s_des img1 mrp model_no -_id')
//             .exec()
//             .then(docs1 => {
//                 Prod.find().distinct('brand')
//                     .then(docs2 => {
//                         Prod.find().distinct('sub_brand')
//                             .then(docs3 => {
//                                 Prod.find().distinct('model_no')
//                                     .then(docs4 => {
//                                         Prod.find().distinct('s_des')
//                                             .then(docs5 => {
//                                                 const docs = docs2.concat(docs3, docs4, docs5, docs1)
//                                                 // console.log(docs)
//                                                 res.render('index', {
//                                                     results: docs
//                                                 })
//                                             })
//                                     })
//                                     .catch(err => {
//                                         res.status(500).json({
//                                             error: err
//                                         });
//                                     });
//                             });
//                     })
//                     .catch(err => {
//                         res.status(500).json({
//                             error: err
//                         });
//                     });
//             });
//     } else {
//         res.redirect("/myaccount")
//     }

// });


// Brand by Attribute Shop
/*router.post("/brandbyattributeshop", (req, res, next) => {
    var fltrbrand = req.body.brand;
    var fltrsub_brand = req.body.sub_brand;
    var fltrcolour = req.body.colour;
    if(fltrbrand !='' && fltrsub_brand !='' && fltrcolour != ''){
        var filterParameter = { $and:[{ brand:fltrbrand},
    {$and:[{sub_brand:fltrbrand},{colour:fltrcolour}]}   
    ]

        }
    }else if (fltrbrand !='' && fltrsub_brand =='' && fltrcolour != ''){
        var filterParameter = { $and:[{ brand:fltrbrand},{colour:fltrcolour}]
            }   

    }else if (fltrbrand =='' && fltrsub_brand !='' && fltrcolour != ''){
        var filterParameter = { $and:[{ sub_brand:fltrsub_brand},{colour:fltrcolour}]
            }   
    }else if (fltrbrand !='' && fltrsub_brand !='' && fltrcolour == ''){
        var filterParameter = { $and:[{ brand:fltrbrand},{sub_brand:fltrsub_brand}]
            } 
    }else{
        var filterParameter={}
    }
    var ProdFltr = Prod.find(filterParameter);
    ProdFltr.exec(function(err,data){
        if(err) throw err;
        res.render("shop", { results: results });
        });
});*/

/*kennel.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  }); */
// return res.sendFile("home.ejs", { root: path.join(__dirname, '/views') });

// router.get("/", (req, res) => {
//     Prod.find({}, 'brand s_des img1 mrp model_no -_id')
//         .then(results => {
//             if (results) {
//                 res.render('index', { results: results });
//             } else { console.log("Empty") }
//         })
//         .catch(err => console.log(err));
// });

// router.get("/list", (req, res) => {
//     Prod.find().distinct('brand')
//         .then(docs1 => {
//             Prod.find().distinct('sub_brand')
//             .then(docs2 => {
//                 const docs = docs1.concat(docs2)
//                 console.log(docs)
//             })
//             .catch(err => {
//                 res.status(500).json({
//                     error: err
//                 });
//             });

//     })
//     .catch(err => {
//         res.status(500).json({
//             error: err
//         });
//     });
// });
// Search
// router.post("/search", (req, res) => {
//     var word = req.body.word;
//     Prod.find({ $or: [{ brand: word }, { sub_brand: word }, { model_no: word }] })
//         .exec()
//         .then(results => {
//             console.log(results)
//             res.render("shop", { results: results });
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             });
//         });
// });

// var delta = Math.abs(currentDate - lin) / 1000
//     var days = Math.floor(delta / 86400);
//     delta -= days * 86400;

//     // calculate (and subtract) whole hours
//     var hours = Math.floor(delta / 3600) % 24;
//     delta -= hours * 3600;

//     // calculate (and subtract) whole minutes
//     var minutes = Math.floor(delta / 60) % 60;
//     delta -= minutes * 60;

//     // what's left is seconds
//     var seconds = Math.round(delta % 60);
//     const duration = days + "days:" + hours + "Hrs:" + minutes + "mins:" + seconds + "secs"
module.exports = router;