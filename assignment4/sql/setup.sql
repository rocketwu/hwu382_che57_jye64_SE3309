create table member 
(
    memberID INT unsigned NOT NULL auto_increment,
    memberName varchar(50) NOT NULL,
    calorieLimitation FLOAT ,
    primary key (memberID)    
);

create table recipe
(
	recipeID INT unsigned UNIQUE NOT NULL, 
	recipeName VARCHAR(50) NOT NULL,
	calorie FLOAT NOT NULL,
	recipeDescription VARCHAR(500),
	primary key (recipeID)
);


create table wisheddish 
(
	dishID INT unsigned NOT NULL unique auto_increment,
    dishName varchar(50) NOT NULL,
    dateToEat date NOT NULL,
    quantity INT unsigned NOT NULL,
    calorie float NOT NULL,
    dateOfAdding date NOT NULL,
    memberID INT unsigned NOT NULL,
    recipeID INT unsigned NOT NULL,
    
    primary key (dishID),
    foreign key (memberID) references member(memberID),
    foreign key (recipeID) references recipe(recipeID)
);


create table ShoppingList (
    listID INT unsigned NOT NULL unique auto_increment,
    shoppingDate date not null,
    primary key (listID)
);

create table ingredientInformation 
(
	ingredientID INT unsigned NOT NULL auto_increment,
	name varchar(50) NOT NULL,
	brand varchar(50) ,
	placeToBuy varchar(50) NOT NULL,
	customizeUnit FLOAT,
	caloriePerUnit FLOAT,
	primary key (ingredientID)    
);

create table shoppingDetail 
(
    listID INT unsigned NOT NULL,
    ingredientID INT unsigned NOT NULL,
    ingredientQuantity int unsigned not null,
    unique(listID, ingredientID),
    primary key (listID, ingredientID),
    foreign key (listID) references shoppinglist(listID),
    foreign key (ingredientID) references ingredientinformation(ingredientID)
);

create table recipedetail 
(
	recipeID INT unsigned NOT NULL,
	ingredientID INT unsigned NOT NULL, 
	ingredientQuantity FLOAT unsigned NOT NULL,
    
	primary key (recipeID, ingredientID),
	Foreign key (recipeID) references Recipe(recipeID),
	Foreign key (ingredientID) references IngredientInformation(ingredientID)

);

create table foodtype
(
	name varchar(50) NOT NULL,
	type varchar(50) ,
	primary key(name)
);

create table storage
(
	storageLocation varchar(50) NOT NULL,
	storageMethode varchar(50),
	primary key(storageLocation)
);


CREATE TABLE `inventory` (
	`batchID` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`expireDate` date NOT NULL,
	`quantity` int(11) NOT NULL,
	`dateBought` date DEFAULT NULL,
	`storageLocation` varchar(50) NOT NULL,
	`ingredientID` int(10) unsigned NOT NULL,
	PRIMARY KEY (`batchID`),
	UNIQUE KEY `batchID` (`batchID`),
	KEY `storageLocation` (`storageLocation`),
	KEY `ingredientID` (`ingredientID`),
	CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`storageLocation`) REFERENCES `storage` (`storagelocation`),
	CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`ingredientID`) REFERENCES `ingredientinformation` (`ingredientid`)
) ;

CREATE VIEW inventorywithname AS 
SELECT f.name, i.batchID, i.expireDate, i.quantity, i.storageLocation
FROM inventory i JOIN ingredientinformation f ON i.ingredientID = f.ingredientID;

CREATE VIEW freshInventory AS 
SELECT *
FROM inventorywithname
WHERE expireDate > curdate();

CREATE VIEW wisheddishWithName AS 
SELECT wr.dishID, wr.dishName, m.memberName AS memberAdded, wr.dateToEat, wr.quantity, wr.calorie, wr.dateOfAdding, wr.recipeInvolved
FROM
(SELECT w.dishID, w.dishName, w.dateToEat, w.quantity, w.calorie, w.dateOfAdding, w.memberID, r.recipeName AS recipeInvolved
FROM wisheddish w JOIN recipe r ON w.recipeID = r.recipeID) wr
JOIN member m ON wr.memberID = m.memberID;

CREATE VIEW recipedetailwithname AS 
SELECT f.name, i.ingredientID, i.recipeID, i.ingredientQuantity
FROM recipedetail i JOIN ingredientinformation f ON i.ingredientID = f.ingredientID;