var express = require("express");
var app = express();
var handlebars = require("express-handlebars").create({defaultLayout:"main"});
var bodyParser = require("body-parser");
var mysql = require("./dbcon.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set('port', process.argv[2]);
app.use(express.static("public"));


// Imports images
app.use(express.static('public'));

// Home Page
app.get("/", (req, res, next) => {
    let context = {};
    res.render("home", context);
  });

// Employees Page
app.get("/employees", (req, res, next) => {
	let selectEmployees = 'SELECT * FROM Employees';
	// Adds query to datatbase. Sends data to render file
	mysql.pool.query(selectEmployees, function(err, rows, fields) {
		if (err) {
			console.log(err);
		} else {
			console.log('Successful employees select');
			res.render("employee", {results: rows});
		};
	});

	
});

// Events Page
app.get("/events", (req, res, next) => {
	let selectEvents = 'SELECT * FROM Events';
	// Adds query to datatbase. Sends data to render file
	mysql.pool.query(selectEvents, function(err, rows, fields) {
		if (err) {
			console.log(err);
		} else {
			console.log('Successful events select');
			res.render("events", {results: rows});
		};
	});
	});

// Jobs Page
app.get("/jobs", (req, res, next) => {
	let selectJobs = 'SELECT * FROM Jobs';
	// Adds query to datatbase. Sends data to render file
	mysql.pool.query(selectJobs, function(err, rows, fields) {
		if (err) {
			console.log(err);
		} else {
			console.log('Successful jobs select');
			res.render("jobs", {results: rows});
		};
	});
	});

// Menu Page
app.get("/menu", (req, res, next) => {
	let selectMenu = 'SELECT * FROM Drinks';
	// Adds query to datatbase. Sends data to render file
	mysql.pool.query(selectMenu, function(err, rows, fields) {
		if (err) {
			console.log(err);
		} else {
			console.log('Successful drinks select');
			console.log(rows);
			res.render("menu", {results: rows});
		};
	});
	});

// Inventory Page
app.get("/inventory", (req, res, next) => {
	let selectInventory = 'SELECT * FROM Inventory';
	// Adds query to datatbase. Sends data to render file
	mysql.pool.query(selectInventory, function(err, rows, fields){
		if (err) {
			console.log(err);
		} else {
			console.log('Successful inventory select');
			res.render("inventory", {results: rows});
		};
	});
	});

// 404 not found
app.use((req,res) => { 
	res.status(404);
	res.render('404');
});

// 500 server error
app.use((err,  req,  res,  next) => {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

// listen
app.listen(app.get('port'), () => {
	console.log(`Server is listening on http://${process.env.HOSTNAME}:${app.get('port')}; press Ctrl-C to terminte` ); 
});