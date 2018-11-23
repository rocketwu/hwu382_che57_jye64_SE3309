#find the ingredients which are insufficient in inventory to make a wished dish
#and then create a next day shopping list, add the ingredientID, ingredientQuantity 
#into the shopping list by inserting shoppingdetail

INSERT INTO shoppinglist(shoppingDate) VALUES (curdate()+1);	# create a new shopping list

INSERT INTO shoppingdetail (listID, ingredientID, ingredientQuantity)

SELECT lID, ingredientID, quantityNeedToBuy FROM 

(SELECT MIN(listID) AS lID 
FROM shoppinglist 
WHERE shoppingDate IN 
(SELECT MIN(shoppingDate) 
FROM shoppinglist 
WHERE shoppingDate > curdate())) AS l,

(SELECT i.ingredientID, (result.totalQuantityNeeded-i.quantity) AS quantityNeedToBuy
FROM inventory i JOIN
(SELECT (w.quantity * r.ingredientQuantity) AS totalQuantityNeeded, ingredientID
FROM wisheddish w, recipedetail r
WHERE w.recipeID = r.recipeID) result ON i.ingredientID = result.ingredientID
WHERE i.quantity < result.totalQuantityNeeded) AS i;




#update the storage location of those ingredients which are required by a wished dish to "qui"
UPDATE inventory
SET storageLocation = 'qui'
WHERE ingredientID IN
(SELECT ingredientID 
FROM wisheddish w JOIN recipedetail r ON r.recipeID = w.recipeID);


#delete the shopping list who does not have shopping detail
DELETE FROM shoppinglist WHERE listID NOT IN (SELECT listID FROM shoppingdetail);
