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
	mysql.pool.query(selectEmployees, function(err, rows, fields) {
		if (err) {
			console.log(err);
		} else {
			
		};

	});

	let context = {};
	res.render("employee", context);
});

// Events Page
app.get("/events", (req, res, next) => {
	let selectEvents = 'SELECT * FROM Events';
	mysql.pool.query(selectEvents, function(err, rows, fields) {
		if (err) {
			console.log(err);
		} else {
			
		};
	});

	let context = {};
	res.render("events", context);
	});

// Jobs Page
app.get("/jobs", (req, res, next) => {
	let selectJobs = 'SELECT * FROM Jobs';
	mysql.pool.query(selectJobs, function(err, rows, fields) {
		if (err) {
			console.log(err);
		} else {
			console.log('Successful');
			
		};
	});
	let context = {};
	res.render("jobs", context);
	});

// Menu Page
app.get("/menu", (req, res, next) => {
	let selectMenu = 'SELECT * FROM Drinks';
	mysql.pool.query(selectMenu, function(err, rows, fields) {
		if (err) {
			console.log(err);
		} else {
			console.log('Successful');
		};
	});

	let context = {};
	res.render("menu", context);
	});

// Inventory Page
app.get("/inventory", (req, res, next) => {
	let selectInventory = 'SELECT * FROM Inventory';
	mysql.pool.query(selectInventory, function(err, rows, fields){
		if (err) {
			console.log(err);
		} else {
			console.log('Successful');
		};
	});
	let context = {};
	res.render("inventory", context);
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