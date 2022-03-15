-- MySQL dump 10.16  Distrib 10.1.37-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: bsg
-- ------------------------------------------------------
-- Server version 10.1.37-MariaDB

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `Jobs`;
DROP TABLE IF EXISTS `Employees`;
DROP TABLE IF EXISTS `Inventory`;
DROP TABLE IF EXISTS `Drinks`;
DROP TABLE IF EXISTS `Events`;
SET FOREIGN_KEY_CHECKS=1;

-- ------------------------------JOBS-------------------------------------------
-- CREATE TABLE ---
DROP TABLE IF EXISTS `Jobs`;
CREATE TABLE `Jobs` (
	`job_code` int UNIQUE AUTO_INCREMENT NOT NULL,
	`job_title` char(255) UNIQUE NOT NULL,
	`hourly_rate` decimal(18,2) NOT NULL,
	PRIMARY KEY (job_code));

LOCK TABLE `Jobs` WRITE;
-- JOBS SAMPLE DATA --
INSERT INTO `Jobs` (`job_title`, `hourly_rate`) VALUES ('Bartender', 15.00);
INSERT INTO `Jobs` (`job_title`, `hourly_rate`) VALUES ('Security', 35.00);
INSERT INTO `Jobs` (`job_title`, `hourly_rate`) VALUES ('Barback', 20.00);
UNLOCK TABLES;



-- ------------------------------EMPLOYEES-------------------------------------------

-- CREATE TABLE --
DROP TABLE IF EXISTS `Employees`;
CREATE TABLE `Employees` (
	`employee_ID` int UNIQUE AUTO_INCREMENT NOT NULL,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`telephone` varchar (255) NOT NULL,
	`job_code` int,
	`start_date` DATE NOT NULL,
	PRIMARY KEY (`employee_ID`),
	FOREIGN KEY (`job_code`) REFERENCES `Jobs` (`job_code`)
	ON UPDATE CASCADE
	ON DELETE SET NULL
);


LOCK TABLE `Employees` WRITE;
-- SAMPLE DATA --
INSERT INTO `Employees` (`first_name`, `last_name`, `telephone`, `job_code`, `start_date`)
VALUES ('Bob', 'Grand', '3312312', 1, '9999-12-31');
INSERT INTO `Employees` (`first_name`, `last_name`, `telephone`, `job_code`, `start_date`)
VALUES ('John', 'Smith', '21241241', 1, '2008-11-11');
INSERT INTO `Employees` (`first_name`, `last_name`, `telephone`, `job_code`, `start_date`)
VALUES ('Sally', 'Jones', '241412412', 2, '2011-11-11');
INSERT INTO `Employees` (`first_name`, `last_name`, `telephone`, `job_code`, `start_date`)
VALUES ('Bobby', 'Lincoln', '2412451', 2, '2022-01-01');
INSERT INTO `Employees` (`first_name`, `last_name`, `telephone`, `job_code`, `start_date`)
VALUES ('Sara', 'Garfield', '2754331', 3, '2010-12-10');
UNLOCK TABLES;

--
-- ------------------------------INVENTORY-------------------------------------------
--
DROP TABLE IF EXISTS `Inventory`;
CREATE TABLE `Inventory` (
	`product_ID` int UNIQUE AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`category` char(255) NOT NULL,
	`btl_cost` decimal(18,2) DEFAULT NULL,
	`cse_cost` decimal(18,2) DEFAULT NULL,
	`distributor` varchar(255),
	PRIMARY KEY (`product_ID`));

-- INVENTORY SAMPLE DATA --
LOCK TABLES `Inventory` WRITE;
INSERT INTO `Inventory` (`name`, `category`, `btl_cost`, `cse_cost`, `distributor`)
VALUES ('N/A', 'N/A', 0.00, 00.00, 'N/A');
INSERT INTO `Inventory` (`name`, `category`, `btl_cost`, `cse_cost`, `distributor`)
VALUES ('Bulleit Bourbon', 'Whiskey/Bourbon', 28.00, 275.00, 'Youngs Spirits');
INSERT INTO `Inventory` (`name`, `category`, `btl_cost`, `cse_cost`, `distributor`)
VALUES ('Bulleit Rye', 'Whiskey/Bourbon', 28.00, 275.00, 'Youngs Spirits');
INSERT INTO `Inventory` (`name`, `category`, `btl_cost`, `cse_cost`, `distributor`)
VALUES ('Jamesons Irish Whisky', 'Whiskey/Bourbon', 26.00, 260.00, 'Seamus & Sons Spirits & More');
INSERT INTO `Inventory` (`name`, `category`, `btl_cost`, `cse_cost`, `distributor`)
VALUES ('Russian Standard', 'Vodka', 28.00, 280.00, 'Seamus & Sons Spirits & More');
INSERT INTO `Inventory` (`name`, `category`, `btl_cost`, `cse_cost`, `distributor`)
VALUES ('Casamigos Reposado', 'Tequila/Mezcal', 32.00, 295.00, 'Youngs Spirits');
INSERT INTO `Inventory` (`name`, `category`, `btl_cost`, `cse_cost`, `distributor`)
VALUES ('Angostura Bitters', 'Misc', 5.00, NULL, 'Youngs Spirits');
INSERT INTO `Inventory` (`name`, `category`, `btl_cost`, `cse_cost`, `distributor`)
VALUES ('Sweet Vermouth', 'Misc', 18.00, NULL, 'Youngs Spirits');
INSERT INTO `Inventory` (`name`, `category`, `btl_cost`, `cse_cost`, `distributor`)
VALUES ('Averna Amaro', 'Misc', 24.00, NULL, 'Youngs Spirits');
INSERT INTO `Inventory` (`name`, `category`, `btl_cost`, `cse_cost`, `distributor`)
VALUES ('Luxardo Cherries', 'Misc', 18.00, NULL, 'Seamus & Sons Spirits & More');
INSERT INTO `Inventory` (`name`, `category`, `btl_cost`, `cse_cost`, `distributor`)
VALUES ('Lemon Juice', 'Mixers', 8.00, 42.00, 'Smart & Final');
INSERT INTO `Inventory` (`name`, `category`, `btl_cost`, `cse_cost`, `distributor`)
VALUES ('Lime Juice', 'Mixers', 8.00, 42.00, 'Smart & Final');
INSERT INTO `Inventory` (`name`, `category`, `btl_cost`, `cse_cost`, `distributor`)
VALUES ('Gran Marnier', 'Misc', 36.00, NULL, 'Youngs Spirits');
UNLOCK TABLES;



-- ------------------------------DRINKS-------------------------------------------
DROP TABLE IF EXISTS `Drinks`;
CREATE TABLE `Drinks` (
	`menu_item` int UNIQUE NOT NULL AUTO_INCREMENT,
	`drink_name` varchar(255) UNIQUE NOT NULL,
	`ingredient_1` int NOT NULL,
	`ingredient_2` int DEFAULT NULL,
	`ingredient_3` int DEFAULT NULL,
	`ingredient_4` int DEFAULT NULL,
	`ingredient_5` int DEFAULT NULL,
	`price` decimal(18,2) NOT NULL,
	PRIMARY KEY (`menu_item`),
	FOREIGN KEY (`ingredient_1`)
	REFERENCES `Inventory` (`product_ID`)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (`ingredient_2`)
	REFERENCES `Inventory` (`product_ID`)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (`ingredient_3`)
	REFERENCES `Inventory` (`product_ID`)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (`ingredient_4`)
	REFERENCES `Inventory` (`product_ID`)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (`ingredient_5`)
	REFERENCES `Inventory` (`product_ID`)	
		ON UPDATE CASCADE
		ON DELETE CASCADE);


--
-- DRINKS SAMPLE DATA
--
LOCK TABLE `Drinks` WRITE;
INSERT INTO Drinks (drink_name, ingredient_1, ingredient_2, ingredient_3, price)
VALUES ('Old Fashioned', 1, 6, 9, 12.00);
INSERT INTO Drinks (drink_name, ingredient_1, ingredient_2, ingredient_3, ingredient_4, ingredient_5, price)
VALUES ('Manhattan', 2, 7, 8, 6, 9, 12.00);
INSERT INTO Drinks (drink_name, ingredient_1, ingredient_2, price)
VALUES ('Whiskey Sour', 1, 10, 12.00);
INSERT INTO Drinks (drink_name, ingredient_1, ingredient_2, price)
VALUES ('Moscow Mule', 4, 11, 10.00);
INSERT INTO Drinks (drink_name, ingredient_1, ingredient_2, ingredient_3, ingredient_4, price)
VALUES ('Cadillac Margarita', 5, 10, 11, 12, 12.00);
UNLOCK TABLES;
-- ------------------------------EVENTS-------------------------------------------

-- CREATE TABLE --
DROP TABLE IF EXISTS `Events`;
CREATE TABLE `Events` (
	`event_ID` int UNIQUE AUTO_INCREMENT NOT NULL,
	`event_name` varchar(255) NOT NULL,
	`event_date` DATE NOT NULL,
	`employee_1` int DEFAULT NULL,
	`employee_2` int DEFAULT NULL,
	`employee_3` int DEFAULT NULL,
	`employee_4` int DEFAULT NULL,
	`employee_5` int DEFAULT NULL,
	`guest_count` int NOT NULL,
	`menu_item` int DEFAULT NULL,
	PRIMARY KEY (`event_ID`),
	FOREIGN KEY (`employee_1`) 
	REFERENCES `Employees` (`employee_ID`)
		ON UPDATE CASCADE
		ON DELETE SET NULL,
	FOREIGN KEY (`employee_2`) 
	REFERENCES `Employees` (`employee_ID`)
		ON UPDATE CASCADE
		ON DELETE SET NULL,
	FOREIGN KEY (`employee_3`) 
	REFERENCES `Employees` (`employee_ID`)
		ON UPDATE CASCADE
		ON DELETE SET NULL,
	FOREIGN KEY (`employee_4`) 
	REFERENCES `Employees` (`employee_ID`)
		ON UPDATE CASCADE
		ON DELETE SET NULL,
	FOREIGN KEY (`employee_5`) 
	REFERENCES `Employees` (`employee_ID`)
		ON UPDATE CASCADE
		ON DELETE SET NULL,
	FOREIGN KEY (`menu_item`) 
	REFERENCES `Drinks` (`menu_item`)
		ON UPDATE CASCADE	
		ON DELETE SET NULL
);

-- SAMPLE DATA --
LOCK TABLES `Events` WRITE;
INSERT INTO Events (event_name, event_date, employee_1, employee_2, employee_3, guest_count, menu_item)
VALUES ('Town Hall', '2022-06-10', 1, 2, 3, 25, 1);
INSERT INTO Events (event_name, event_date, employee_1, employee_2, employee_3, guest_count, menu_item)
VALUES ('Awards Banquet', '2022-08-10', 1, 2, 3, 200, 2);
INSERT INTO Events (event_name, event_date, employee_1, employee_2, employee_3, guest_count, menu_item)
VALUES ('Family Reunion', '2022-06-15', 1, 2, 3, 100, 4);
INSERT INTO Events (event_name, event_date, employee_1, employee_2, employee_3, guest_count, menu_item)
VALUES ('Target Happy Hour', '2022-06-17', 1, 2, 3, 20, 4);
UNLOCK TABLES;


