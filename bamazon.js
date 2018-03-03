var mysql = require('mysql');
var inquirer = require('inquirer');
var request = require('request');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon",

  // multipleStatements: true,
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId + "\n");
  // updateqty();
  var products = connection.query(
    "SELECT product_name FROM products;",
    function(err, res) {
      if (err) throw err;
      for (var i = 9; i < res.length; i++) {
        console.log("\n ----------------------------------------------- \n");
        console.log("1: " + res[0].product_name);
        console.log("2: " + res[1].product_name);
        console.log("3: " + res[2].product_name);
        console.log("4: " + res[3].product_name);
        console.log("5: " + res[4].product_name);
        console.log("6: " + res[5].product_name);
        console.log("7: " + res[6].product_name);
        console.log("8: " + res[7].product_name);
        console.log("9: " + res[8].product_name);
        console.log("10: " + res[9].product_name);
        console.log("\n ----------------------------------------------- \n");
      }
    });
  inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "Using the product ID, please specify what you would like to buy:",
      name: "productID"
    },
    {
      type: "input",
      message: "How many would you like to buy?",
      name: "quantity"
    }
    ])
  .then(function(input){
    if (input.productID !== "") {
      // updateQty();
      console.log("Placing your order now!\n");
      var query = connection.query(
        "SELECT stock_quantity FROM products WHERE ?",
        [
        {
          item_id: input.productID
        }
        ],
        function(err, ces) {
          if (err) throw err;
            //console.log(parseInt(ces[0].stock_quantity) - parseInt(input.quantity));
            query = connection.query(    
              "UPDATE products SET ? WHERE ?",
              [
              {
                stock_quantity: ces[0].stock_quantity - input.quantity
              },
              {
                item_id: input.productID
              }
              ],
              function(err, ans) {
                if (err) {
                  console.log("Insufficient quantity, sorry!");
                  connection.end()
                } else {
                  query = connection.query(
                    "SELECT stock_quantity, product_name, price FROM products WHERE ?",
                    [
                    {
                      item_id: input.productID
                    }
                    ],
                    function(err, roc) {
                      if (err) throw err;
                      console.log("Sale complete!");
                      console.log(roc[0]);
                      var total = (roc[0].price * input.quantity);
                      console.log("Total cost of " + input.quantity + " " + roc[0].product_name + " is: $" + total.toFixed(2));
                      connection.end();
                    });
                }
                });
        });
    };
  });
});






// tried to do a multiple statement query to pull info for "Total cost of input_quantity product_name is: " but it didn't work
// :( here's the stack overflow I was trying to use: 
// https://stackoverflow.com/questions/23266854/node-mysql-multiple-statement-in-one-query
// ---------------------------------------------------------------------------------------------------
                  // query = connection.query(    
                  // "SELECT  FROM products WHERE ?,"
                  // [
                  // {
                  //   item_id: input.productID
                  // }
                  // ],
                  //   function(err, roc) {
                  //     if (err) throw err;
                  //     console.log(roc);
                      
                  //   },
                  // );