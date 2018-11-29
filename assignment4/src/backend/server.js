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

var c = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'itssql',
    database: 'itssql'
});

c.connect(function (err) {
    if (err){
        console.log(err);
        return;
    }
    console.log('success connected to database');
});

c.query('SELECT * FROM recipedetail', function (err, res, field) {// TODO: 数据库连接测试，待删
    console.log(res);

})

router.route('/shoppinglist')
    .get(function (req, res) {
        //request to get shopping list
        res.json({code: 0, msg:'request to get shopping list'});
    });

router.route('/recommend')
    .get(function (req, res) {
        //request to get recommend recipe
        res.json({code: 0, msg:'request to get recommend recipe'});
    });

router.route('/inventory/:invID')
    .get(function (req, res) {
        //request to get recipe based on invID
        res.json({code: 0, msg: 'request to get recipe based on invID'});
    });

router.route('/recipe/:recID')
    .delete(function (req, res) {
        //request to delete recipe
        //res.json({msg: 'request to delete recipe', rec: req});
        let recId = req.params.recID;
        //check whether recipe is in a wish list
        c.query(
            'SELECT COUNT(*) AS num FROM `wisheddish` WHERE recipeID = ?',
            [recId],
            function (err, result, field) {
                if (err){
                    console.log(err);
                    res.json({code: 2, msg: 'Unknown error'});
                    return;
                } 
                if (result[0].num == 0){
                    //no wish list based on this recipe
                    c.query(
                        'DELETE FROM `recipedetail`' +
                        'WHERE recipeID = ?',
                        [recId],
                        function (err, result, field) {
                            if (err){
                                console.log(err);
                                res.json({code: 2, msg: 'Unknown error'});
                                return;
                            }
                            console.log('deleted ' + result.affectedRows + ' rows');
                            c.query(
                                'DELETE FROM `recipe`' +
                                'WHERE recipeID = ?',
                                [recId],
                                function (err, result, field) {
                                    if (err) {
                                        console.log(err);
                                        res.json({code: 2, msg: 'Unknown error'});
                                        return;
                                    }
                                    console.log('deleted ' + result.affectedRows + ' rows');
                                    res.json({code: 1, msg: 'Success deleted'});
                                }
                            )
                        }
                    )
                }
                else {
                    res.json({code: 0, msg: 'Cannot delete this recipe because some of your wished dish need this recipe.'})
                }
            }
        );
    });

router.route('/inventory')
    .get(function (req, res) {
        //request to show all inventory
        // res.json({code: 0, msg: 'request to show all inventory', rec: req});
        c.query(
            'SELECT * FROM inventorywithname',
            function (err, result, field) {
                if (err) {
                    console.log(err);
                    res.json({code: 2, msg: 'Unknown error'});
                    return;
                }
                res.json(result);
            }
        )
    });

router.route('/wisheddish')
    .get(function (req, res) {
        //request to show all wished dish
        res.json({code: 0, msg: 'request to show all wished dish'});
    })
    
    .post(function (req, res) {
        //request to add wished dish
        res.json({code: 0, msg: 'request to add wished dish'});
    });


app.use('/', router);

app.listen(port);
console.log('Backend Server Up, Port: '+port);



