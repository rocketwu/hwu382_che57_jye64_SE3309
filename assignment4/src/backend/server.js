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
    host: '99.249.196.234',
    port: 50102,
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
            'SELECT * FROM `inventorywithname`',
            function (err, result, field) {
                if (err) {
                    console.log(err);
                    res.json({code: 2, msg: 'Unknown error'});
                    return;
                }
                res.json({code: 1, msg: 'success', result: result});
            }
        )
    });

router.route('/wisheddish')
    .get(function (req, res) {
        //request to show all wished dish
        //res.json({code: 0, msg: 'request to show all wished dish'});
        c.query(
            'SELECT * FROM `wisheddishwithname`',
            function (err, result, field) {
                if (err){
                    console.log(err);
                    res.json({code: 2, msg: 'Unknown error'});
                    return;
                }
                res.json({code: 1, msg: 'success', result: result});
            }
        )
        
    })
    
    .post(function (req, res) {
        //request to add wished dish
        //body{dishName, dateToEat, quantity, memberID, recipeID}
        let dishName = req.body.dishName,
            dateToEat = req.body.dateToEat,
            quantity = req.body.quantity,
            memberID = req.body.memberID,
            calorie,
            recipeID = req.body.recipeID;
        c.query(
            //find calorie of recipe first
            'SELECT calorie FROM `recipe` WHERE recipeID = ?',
            [recipeID],
            function (error, result, field) {
                if (error){
                    console.log(err);
                    res.json({code: 2, msg: 'Unknown error'});
                    return;
                }
                if (result.length == 0){
                    res.json({code: 0, msg: 'The recipe you choose is not exist anymore!'});
                }else {
                    //find the recipe, calculate calorie
                    calorie = quantity * result[0].calorie;
                    console.log(calorie);
                    c.query(
                        'INSERT INTO `wisheddish` (`dishName`, `dateToEat`, `quantity`, `calorie`, `dateOfAdding`, `memberID`, `recipeID`)' +
                        'VALUES (?, ?, ?, ?, ?, ?, ?)',
                        [dishName, dateToEat, quantity, calorie, mysql.raw('CURDATE()'), memberID, recipeID],
                        function (err, result, field) {
                            if (error){
                                console.log(err);
                                res.json({code: 2, msg: 'Unknown error'});
                                return;
                            }
                            res.json({code:1, msg: 'Add wished dish success!'});
                        }
                    )
                }

            }
        )
    });


app.use('/', router);

app.listen(port);
console.log('Backend Server Up, Port: '+port);



