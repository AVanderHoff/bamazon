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

	console.log('connected ' + connection.threadID);
});


connection.query('SELECT ItemID , ProductName, Price   FROM products', function(err,res){
	if(err){ throw err; }

	console.log(res);

	prompt.get(['ItemID'], function (err, result) { 
	
	var id = result.ItemID;

		prompt.get(['quantity'], function (err, result) {

			var quantity = result.quantity ;
	
			connection.query('SELECT * FROM products WHERE ItemID = ?;',[id],function(err,res){
				if(err){ throw err;}

				var inStock = res[0].Quantity;
				var price = res[0].Price;
				var department = res[0].Department;

				if(quantity > inStock){
				console.log("Insufficient quantity");
				}
				else{ console.log('price: ' + price * quantity);
					var totalSales = price * quantity;
					var newQuantity = inStock - quantity;

					connection.query('UPDATE products SET Quantity = ? WHERE ItemID = ?;',[newQuantity,id],function(err,res){
						if(err){ throw err;}

						
						connection.query('UPDATE departments SET TotalSales = TotalSales + ? WHERE DepartmentName = ?;',[totalSales,department],function(err,res){
							if(err){throw err;}
							console.log("TotalSales updated for " + department + " department");
						
						connection.query('SELECT * FROM products;',function(err,res){
							if(err){ throw err;}
							console.log('\n');
							console.log(res);

						});


					});



					});


				};
		

		});

	
	});


});

});






