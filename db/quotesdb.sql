-- DDL FOR OUR DATABASE
DROP TABLE IF EXISTS `secretnotes`;
DROP TABLE IF EXISTS `lineitems`;
DROP TABLE IF EXISTS `quotes`;
DROP TABLE IF EXISTS `employees`;


CREATE TABLE `employees`(
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `employee_name` VARCHAR(255) NOT NULL,
  `user_name` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255) NOT NULL,
  `commission` decimal(8,2) default '0.00'
);

CREATE TABLE `quotes`(
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `employeeid` INTEGER NOT NULL,
  `price` DECIMAL(8,2) DEFAULT '0.00',
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `status`  VARCHAR(255) DEFAULT 'draft',
  `cust_email` VARCHAR(255) NOT NULL,
  `custid` INTEGER NOT NULL,
  
  FOREIGN KEY (`employeeid`) REFERENCES `employees`(`id`)
);

CREATE TABLE `lineitems`(
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `quoteid` INTEGER NOT NULL,
  `text` TEXT DEFAULT '',
  `price` DECIMAL(8,2) DEFAULT '0.00',

  
  FOREIGN KEY (`quoteid`) REFERENCES `quotes`(`id`)
);

CREATE TABLE `secretnotes`(
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `quoteid` INTEGER NOT NULL,
  `text` TEXT DEFAULT '',
 
  FOREIGN KEY (`quoteid`) REFERENCES `quotes`(`id`)
);


