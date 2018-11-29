var port = 9000;

var bodyParser = require('body-parser');
var express    = require('express');
var mysql = require('mysql');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin',
        '*');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH,GET, PUT, DELETE, OPTIONS');
    next();
});

router.route('/shoppinglist')
    .get(function (req, res) {
        //request to get shopping list
        res.json({msg:'request to get shopping list', rec: req});
    });

router.route('/recommend')
    .get(function (req, res) {
        //request to get recommend recipe
        res.json({msg:'request to get recommend recipe', rec: req});
    });

router.route('/inventory/:invID')
    .get(function (req, res) {
        //request to get recipe based on invID
        res.json({msg: 'request to get recipe based on invID', rec: req});
    });

router.route('/recipe/:recID')
    .delete(function (req, res) {
        //request to delete recipe
        res.json({msg: 'request to delete recipe', rec: req});
    });

router.route('/inventory')
    .get(function (req, res) {
        //request to show all inventory
        res.json({msg: 'request to show all inventory', rec: req});
    });

router.route('/wisheddish')
    .get(function (req, res) {
        //request to show all wished dish
        res.json({msg: 'request to show all wished dish', rec: req});
    })
    
    .post(function (req, res) {
        //request to add wished dish
        res.json({msg: 'request to add wished dish', rec: req});
    });


app.use('/', router);

app.listen(port);
console.log('Backend Server Up, Port: '+port);