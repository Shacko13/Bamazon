// npm packages
var inquirer = require("inquirer");
var mysql = require("mysql");

// mysql connection info for database
var connection = mysql.createConnection({
  host     : "localhost",
  port     : 8889,
  user     : "root",
  password : "root",
  database : "bamazondb"
});
 
 console.log("-------------------------------------");
 console.log("Good day! Welcome to ToddBamazon!");
 console.log("-------------------------------------");

 // Connect to mysql server and database
connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
  
});

// Ensure that user is entering positive numbers
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);
	if (integer && (sign === 1)) {
		return true;
	} else {
		return "You must enter a positive number higher than zero.";
	}
}

function promptUserPurchase() {
// Prompt user to choose item and quantity
inquirer.prompt([
	{
		type: 'input',
		name: 'item_id',
		message: 'Enter the item ID that you would like to buy.\n',
		validate: validateInput,
		filter: Number 
	},
    {
    	type: 'input',
    	name: 'quantity',
    	message: 'How many would you like to buy?',
    	validate: validateInput,
    	filter: Number 
    }

]).then(function (input) {
    
    var item = input.item_id;
    var quantity = input.quantity;
    // Check to see if chosen item and quantity are available
    var queryStr = 'SELECT * FROM bamazondb.products WHERE ?';
    connection.query(queryStr, {item_id: item}, function(err, data) {
    	if(err) throw err;

    	if(data.length === 0) {
    		console.log("Invalid Item Id entered. Please enter valid Item ID.");
    		displayInventory();

    	} else {
    		var productData = data[0];
    		// If quantity chosen is available
    		if(quantity <= productData.stock_quantity) {
    			console.log("Item is in stock. Your order is being placed.");

    			// Create updating query string
    			var updateQueryStr = 'UPDATE bamazondb.products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

    			//Update inventory
    			connection.query(updateQueryStr, function(err, data) {
    				if(err) throw err;
    				console.log("Your order has been processed. Your total is $" + productData.customer_price * quantity);
    				console.log("Thank you!");
    				console.log("\n--------------------------------------\n");
    				connection.end();

    			})

    		} else {
                // If quantity chosen is not available
    			console.log("Our apologies. There is not enough inventory available to fill your order. Please change your order.");
    			console.log("\n--------------------------------------\n");

    			displayInventory();
    		}
    	}
    })

   })
}

// Show current available inventory
function displayInventory() {
	queryStr = 'SELECT * FROM bamazondb.products';
	connection.query(queryStr, function(err, data) {
		if(err) throw err;

		console.log("Current Inventory: ");
		console.log("...........................................................................................................\n");

		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut = 'Item ID: ' + data[i].item_id + '  //  ';
			strOut += 'Product Name: ' + data[i].product_name + '  //  ';
			strOut += 'Department: ' + data[i].department_name + '  //  ';
			strOut += 'Price: $' + data[i].customer_price + '  //  ';
			strOut += 'Quantity: ' + data[i].stock_quantity + '\n';

			console.log(strOut);
		}

		console.log("-----------------------------------------------------------------------------------------------------------\n");
		promptUserPurchase();
	})
};

function runBamazon() {
	displayInventory();
}

runBamazon();