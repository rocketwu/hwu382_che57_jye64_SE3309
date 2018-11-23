#create a view that contains those recipes which have “healthy” as a keyword   inside their description

create view healthyRecipe
as select * 
from recipe
where recipedescription like 'quis%';


#Create a view that for Mr. Marcellus Reichel III to help him check his wished dish.
create view member1WishedDish as select * from wisheddish
where memberID = (select memberID from member where memberName = 'Mr. Marcellus Reichel III');


#create a view that contains the shopping date, name, brand, and quantity for a specific place to buy
CREATE VIEW shoppingPlan AS
SELECT l.listID, shoppingDate, ingredientID, ingredientQuantity
FROM shoppingdetail d JOIN shoppinglist l ON d.listID = l.listID;

CREATE VIEW shoppingInfo AS
SELECT shoppingDate, name, brand, ingredientQuantity, placeToBuy
FROM shoppingplan p JOIN ingredientinformation i ON p.ingredientID = i.ingredientID
WHERE placeToBuy LIKE 'Suite 434';

