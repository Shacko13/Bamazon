CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
customer_price VARCHAR(100) NOT NULL,
stock_quantity INTEGER(11)
);

INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES ("Chair", "Furniture", 20.00, 100);

INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES ("Table", "Furniture", 99.99, 25);

INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES ("Floor Mat", "Automotive", 9.95, 250);

INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES ("Windshield Shade", "Automotive", 12.50, 200);

INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES ("Toaster Oven", "Kitchen", 69.95, 50);

INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES ("Blender", "Kitchen", 37.50, 75);

INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES ("Cell Phone", "Electronics", 199.95, 100);

INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES ("Television", "Electronics", 349.95, 30);

INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES ("Mouse", "Computers", 19.99, 150);

INSERT INTO products (product_name, department_name, customer_price, stock_quantity)
VALUES ("Keyboard", "Computers", 49.95, 60);