create database bamazon;

use bamazon;

create table products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

UPDATE products SET stock_quantity = 33 WHERE item_id = 1;

SELECT * FROM products;
SELECT product_name FROM products WHERE item_id = 2;

