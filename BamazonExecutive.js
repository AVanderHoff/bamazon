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


console.log('option 1: View Product Sales by Department');
console.log('option 2: Create New Department');

prompt.get(['option'],function(err,result){

	var option = result.option;

	if(option == "1"){option1()}
	else if(option == "2"){option2()}
	else{console.log("invalid input")};
});

function option1(){

connection.query('SELECT DepartmentID, DepartmentName,OverHeadCosts,TotalSales,(TotalSales - OverHeadCosts) AS TotalProfit FROM departments ;',function(err,res){
	if(err){ throw err;}

	console.log(res);
});

};

function option2(){

		prompt.get(['DepartmentName','OverHeadCosts','TotalSales'],function(err,result){

				var newDepartmentName = result.DepartmentName;
				var newOverHeadCosts = result.OverHeadCosts;
				var newTotalSales = result.TotalSales;

		connection.query('INSERT INTO departments(DepartmentID,DepartmentName,OverHeadCosts,TotalSales) VALUES (?,?,?,?);',[0,newDepartmentName,newOverHeadCosts,newTotalSales],function(err,res){

				console.log('new row inserted into departments');


		});
	




	});





};