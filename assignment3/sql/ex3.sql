

INSERT INTO itssql.foodtype
		(name,type)
VALUES
		('apple','fruit');


INSERT INTO foodtype VALUES ('pear','fruit');


INSERT INTO ingredientinformation (name)
SELECT name FROM foodtype;
