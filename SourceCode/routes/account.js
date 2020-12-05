var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/finalproject');

router.get('/', function(req, res) {
    var collection = db.get('Users');
    collection.find({}, function(err, users){
        if (err) throw err;
        res.json(users);
    });
});

// get specific  account
router.get('/:username', function(req, res) {
    var collection = db.get('Users');
    collection.findOne({ username: req.params.username }, function(err, user){
        if (err) throw err;

        res.json(user);
    });
});


// update account   excluding username and password
router.put('/:username', function(req, res){
    var collection = db.get('Users');
    collection.update({
            loginID: req.params.username
        },
        {
            loginID: req.body.username,
            fName: req.body.fName,
            lName: req.body.lName,
            gender: req.body.gender,
            email: req.body.email,
            pass: req.body.password,
            birthday: req.body.birthday,
            admin: req.body.admin
        }, function(err, user){
            if (err) throw err;

            res.json(user);
        });
});


// create an account
router.post('/', function(req, res){
    var collection = db.get('Users');
    var collection_cart = db.get('Cart');
    var collection_order = db.get('Orders');
    collection.findOne({username:req.body.username}, function(err, user){
        if (err) {
            throw err;
        }else if(user){
            res.json({'message': false,'result':0});
        }else{
            collection.insert({
                loginID: req.body.username,
                fName: req.body.fName,
                lName: req.body.lName,
                gender: req.body.gender,
                email: req.body.email,
                pass: req.body.password,
                birthday: req.body.birthday,
                admin: req.body.admin
            }, function(err, user){
                if (err) throw err;
                res.json({'message': true,'result':1}); 
            });

            collection_cart.insert({
                loginID: req.body.username,
                items: {}
            },function(err,cart){
                if(err) throw err;
            });
            collection_order.insert({
                loginID: req.body.username,
                orders: []
            },function(err,cart){
                if(err) throw err;
            });
        }
    });
});

// update password
router.post('/:id', function(req, res){
    var collection = db.get('Users');
    collection.update({
            _id: req.params.id
        },
        {
            $set : {pass :req.body.password}
        }, function(err, user){
            if (err) throw err;

            res.json(user);
        });
});




module.exports = router;