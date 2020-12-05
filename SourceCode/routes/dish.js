var express = require('express');
var router = express();

var monk = require('monk');
var db = monk('localhost:27017/finalproject');
router.get('/', function(req, res) {
    var collection = db.get('Menu');
    collection.find({}, function(err, user){
        if (err) throw err;
        res.json(user);
    });
});

router.post('/', function(req, res){
    var collection = db.get('Menu');
    collection.insert({
        productID: req.body.productID,
        productName: req.body.name,
        image: req.body.image,
        description: req.body.description,
        basePrice: req.body.price,
        stock: req.body.stock
    }, function(err, dish){
        if (err) throw err;
        res.json(dish);
    });
});

// Edit entry
router.get('/:id', function(req, res) {
    var collection = db.get('Menu');
    collection.findOne({ _id: req.params.id }, function(err, entry){
        if (err) throw err;

        res.json(entry);
    });
});

// update entry
router.put('/:id', function(req, res){
    var collection = db.get('Menu');
    collection.update({
            _id: req.params.id
        },
        {
            productID: req.body.productID,
            productName: req.body.name,
            image: req.body.image,
            description: req.body.description,
            basePrice: req.body.price,
            stock: req.body.stock
        }, function(err, entry){
            if (err) throw err;

            res.json(entry);
        });
});

router.post('/:id', function(req, res){
    var collection = db.get('Menu');
    collection.update({
            _id: req.params.id
        },
        {
            productID: req.body.productID,
            productName: req.body.name,
            image: req.body.image,
            description: req.body.description,
            basePrice: req.body.price,
            stock: req.body.stock
        }, function(err, entry){
            if (err) throw err;

            res.json(entry);
        });
});

module.exports = router;

