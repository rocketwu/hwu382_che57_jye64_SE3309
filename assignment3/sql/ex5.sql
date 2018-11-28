#List the ingredientID, name, brand of inventory food.
select ingredientID, name, brand FROM ingredientinformation
where ingredientID IN (select ingredientID from inventory);


#List the number of the inventory less than 4 that stores with store methods and order in ascend
SELECT s.storageMethod, COUNT(i.batchID) AS numberOFInventory 
FROM storage s, inventory i 
WHERE s.storageLocation = i.storageLocation 
GROUP BY s.storageMethod 
HAVING numberOFInventory < 4
ORDER BY numberOFInventory;


#list the available place to buy for a specific ingredient in a recipe, in ascending order of recipeID.
select recipeID, r.ingredientID, placeToBuy
from recipedetail r, ingredientinformation ingre
where r.ingredientID = ingre.ingredientID
group by recipeID;


#List the name of ingredient stores in ‘qui’.
select name from ingredientinformation
where ingredientID in (select ingredientID from inventory where storageLocation = 'qui');


#List the ingredientID and the quantity needed to buy of a wished dish whose ingredient inventory is lack of
SELECT result.dishID, i.ingredientID, (result.totalQuantityNeeded-i.quantity) AS quantityNeedToBuy
FROM inventory i JOIN
(SELECT dishID, (w.quantity * r.ingredientQuantity) AS totalQuantityNeeded, ingredientID
FROM wisheddish w, recipedetail r
WHERE w.recipeID = r.recipeID) result ON i.ingredientID = result.ingredientID
WHERE i.quantity < result.totalQuantityNeeded;


#Lish the dishID and the reciepID where the user is looking for eating but don't have the recipe detail
SELECT w.dishID, r.recipeID
FROM wisheddish w, recipe r 
WHERE r.recipeID NOT IN (SELECT recipeID FROM recipedetail) AND r.recipeID = w.recipeID
ORDER BY dishID;
