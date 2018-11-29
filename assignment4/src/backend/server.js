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
        c.query(
            'SELECT j.ingredientID, name, quantityNeedToBuy FROM\n' +
            'ingredientinformation info JOIN\n' +
            '(SELECT ingredientID, quantityNeedToBuy FROM\n' +
            '(SELECT i.ingredientID, (result.totalQuantityNeeded-i.quantity) AS quantityNeedToBuy\n' +
            'FROM inventory i JOIN\n' +
            '(SELECT (w.quantity * r.ingredientQuantity) AS totalQuantityNeeded, ingredientID \n' +
            'FROM wisheddish w, recipedetail r\n' +
            'WHERE w.recipeID = r.recipeID) result ON i.ingredientID = result.ingredientID\n' +
            'WHERE i.quantity < result.totalQuantityNeeded) AS i) j\n' +
            'ON j.ingredientID = info.ingredientID;',
            function (error, result, field) {
                if (error){
                    console.log(error);
                    res.json({code: 2, msg: 'Unknown error'});
                    return;
                }
                res.json({code: 1, msg: 'Here are the things you need to buy', result: result});
            }
        )
    });

router.route('/recommend')
    .get(function (req, res) {
        //request to get recommend recipe
        //res.json({code: 0, msg:'request to get recommend recipe'});
        let threshold = 30;
        c.query(
            'SELECT * FROM recipe JOIN \n' +
            '(SELECT recipeID, COUNT(*) AS hit\n' +
            'FROM recipedetail r JOIN\n' +
            '(SELECT * FROM inventory\n' +
            'WHERE expireDate < date_add(curdate(), interval +? day) AND expireDate > curdate()) inv\n' +
            'ON inv.ingredientID = r.ingredientID\n' +
            'GROUP BY recipeID\n' +
            'ORDER BY hit DESC) res\n' +
            'ON res.recipeID = recipe.recipeID;',
            [threshold],
            function (error, result, field) {
                if (error){
                    console.log(error);
                    res.json({code: 2, msg: 'Unknown error'});
                    return;
                }
                res.json({code: 1, msg: 'Here are the recommended recipes!', result: result});
            }
        )
    });

router.route('/inventory/:invID')
    .get(function (req, res) {
        //request to get recipe based on invID
        //res.json({code: 0, msg: 'request to get recipe based on invID'});
        let invID = req.params.invID;
        c.query(
            'SELECT *\n' +
            'FROM ingredientinformation info JOIN \n' +
            '(SELECT r.recipeID, r.recipeName, calorie, recipeDescription, s.ingredientID FROM recipe r JOIN\n' +
            '(SELECT recipeID, ingredientID FROM recipedetail WHERE ingredientID IN\n' +
            '(SELECT ingredientID FROM inventory i WHERE batchID = 6)\n' +
            ') s ON r.recipeID = s.recipeID) t\n' +
            'ON t.ingredientID = info.ingredientID',
            [invID],
            function (error, result, field) {
                if (error){
                    console.log(error);
                    res.json({code: 2, msg: 'Unknown error'});
                    return;
                }
                res.json({code: 1, msg: 'Find related recipe!', result: result});
            }
        )
    });

router.route('/recipe/:recID')

    .get(function (req, res) {
        let recID = req.params.recID;
        c.query(
            'SELECT recipeName FROM recipe WHERE recipeID = ?',
            [recID],
            function (error, recName, field) {
                if (error){
                    console.log(error);
                    res.json({code: 2, msg: 'Unknown error'});
                    return;
                }
                c.query(
                    'SELECT * FROM recipedetailwithname WHERE recipeID = ?',
                    [recID],
                    function (error, result, field) {
                        if (error){
                            console.log(error);
                            res.json({code: 2, msg: 'Unknown error'});
                            return;
                        }
                        res.json({code: 1, msg: "Here is the recipe: " + recName[0].recipeName + " and its detail", result: {name: recName[0].recipeName, detail: result}});
                    }
                )
            }
        )
    })

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
                    console.log(error);
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



