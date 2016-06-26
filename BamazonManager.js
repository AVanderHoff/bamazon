var keys = require('./keys.js');
var mysql = require('mysql');
var prompt = require('prompt');
var connection = mysql.createConnection(keys.mySQLKeys);

prompt.start();

connection.connect(function(err){

	if(err){
		console.error("error connecting" + err.stack);
		return;
	}
	
});

//1) View Products for Sale 2) View Low Inventory 3) Add to Inventory 4) Add New Product
console.log('option 1 : View Products for Sale ');
console.log('option 2 : View Low Inventory ');
console.log('option 3 : Add to Inventory ');
console.log('option 4 : Add New Product ');
console.log('SELECT OPTION BELOW ');

prompt.get(['option'], function (err, result) {
	var option = result.option;

	if(option == '1'){option1();}
	else if(option == '2'){option2();}
	else if(option == '3'){option3();}
	else if(option == '4'){option4();}
	else{console.log("INVALID INPUT");};



});

function option1(){

	connection.query('SELECT ItemID , ProductName, Price ,Quantity  FROM products', function(err,res){
		if(err){ throw err; }
		
		console.log(res);

	});
};

function option2(){

	connection.query('SELECT * FROM products WHERE Quantity < 5;',function(err,res){
		if(err){throw err;}

		console.log(res);

	});

};

function option3(){

	prompt.get(['ProductName','toAdd'], function (err, result) {

		var ProductName = result.ProductName;
		var toAdd = parseInt(result.toAdd);

		connection.query('SELECT DISTINCT Quantity FROM products WHERE ProductName = ?;',[ProductName],function(err,res){
			if(err){throw err;}

			var currentQuantity = parseInt(res[0].Quantity);
			var newQuantity = currentQuantity + toAdd;
			
			
			connection.query('UPDATE products SET Quantity= ? WHERE ProductName= ?;',[newQuantity,ProductName],function(err,res){
				if(err){throw err;}

				console.log(ProductName + ' quantity updated from ' + currentQuantity + ' to ' + newQuantity);
			
			}); 



		});






});
};

function option4(){


	connection.query('SELECT ItemID FROM products ORDER BY ItemID DESC LIMIT 1',function(err,res){
		if(err){throw err;}

		var lastID = res[0].ItemID + 1;

		prompt.get(['ProductName','Department','Price','Quantity'],function(err,result){

				var ProductName = result.ProductName;
				var Department = result.Department;
				var Price = result.Price;
				var Quantity = result.Quantity;

		connection.query('INSERT INTO products(ItemID,ProductName,Department,Price,Quantity) VALUES (?,?,?,?,?);',[lastID,ProductName,Department,Price,Quantity],function(err,res){

				console.log('new row inserted into products');


		});
	




	});
























});

};