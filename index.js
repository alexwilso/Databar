// Creates table and populates with sample data
require('./database/import.js');

let express = require("express");
let app = express();
let handlebars = require("express-handlebars").create({
	defaultLayout:"main",
	helpers: { // Helper functions for handlebars file
		// Called if value is undefined, replaces with null 
		isNull: function(value){
			if (value == undefined) {
				return 'NULL';
			} else {
				return value;
			};
		},
		// Called in inventory.handlebars. Adds $ if value.
		isNullInventory: function(value){
			if (value == undefined) {
				return 'NULL';
			} else {
				return `$${value}`;
			};
		},
	}
});
let bodyParser = require("body-parser");
let mysql = require("./database/dbcon.js");

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
	let selectEmployees = 'SELECT * FROM Employees LEFT JOIN Jobs ON Employees.job_code = Jobs.job_code';
	let jobValues = 'SELECT * FROM Jobs';
	let context = {};
	// Select employees query
	mysql.pool.query(selectEmployees, (err, rows, fields) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Successful employees select');
			context["results"] = rows; // results of query
			// Select Jobs query
			mysql.pool.query(jobValues, (err, jobrows, jobsfields) => {
				if (err) {
					console.log(err);
				} else {
				console.log('Successful employees select');
				context["jobs"] = jobrows; // results of query
				// Render to employee.handlebars
				res.render("employee", context);
				};
			});
		};
	});
});
// Insert Employee
app.post('/employees', (req, res) => {
	var sql = "INSERT INTO Employees (first_name, last_name, telephone, job_code, start_date) VALUES (?,?,?,?,?)";
	var inserts = [req.body.first_name, req.body.last_name, req.body.telephone, req.body.job_code, req.body.start_date];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			console.log('Employee added');
			res.redirect('/employees');
		}
	});
});


// Events Page
app.get("/events", (req, res, next) => {
	let selectEvents = 'SELECT Events.event_name, Events.event_date, Events.employee_1, Events.employee_2, Events.employee_3, Events.employee_4, Events.employee_5, Events.guest_count, Drinks.drink_name AS drink_special FROM Events LEFT JOIN Drinks ON Events.menu_item = Drinks.menu_item LEFT JOIN Employees ON Events.employee_1 = Employees.employee_ID';
	let selectDrinks = 'SELECT * FROM Drinks';
	let selctEmployees = 'Select Employees.employee_ID, Employees.first_name, Employees.last_name FROM Employees'
	let context = {}
	// Select Events
	mysql.pool.query(selectEvents, (err, rows, fields) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Successful events select');
			context['results'] = rows; // results of query
			// Select Drinks
			mysql.pool.query(selectDrinks, (err, drinkrows) => {
				if (err) {
					console.log(err);
				} else {
				console.log('successful drink query');
				context['drinks'] = drinkrows;
				// Select Employees
				mysql.pool.query(selctEmployees, (err, empRows) => {
					if (err) {
						console.log(err);
					} else {
						console.log('successful employees query')
						context['employees'] = empRows; // results of query
						res.render("events", context); // Renders handlebar file and context Obj	
							};
						});
					};
				});
			};
		});
	});

//Insert Event
app.post('/events', (req, res) => {
	var sql = "INSERT INTO Events (event_name, event_date, employee_1, employee_2, employee_3, employee_4, employee_5, guest_count, menu_item) VALUES (?,?,?,?,?,?,?,?,?)";
	var inserts = [req.body.event_name, req.body.event_date, req.body.employee_1, req.body.employee_2, req.body.employee_3, req.body.employee_4, req.body.employee_5, req.body.guest_count, req.body.menu_item];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			console.log('Event added');
			res.redirect('/events');
		}
	});
});

// Jobs Page
app.get("/jobs", (req, res, next) => {
	let selectJobs = 'SELECT * FROM Jobs';
	// Adds query to datatbase. Sends data to render file
	mysql.pool.query(selectJobs, (err, rows, fields) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Successful jobs select');
			res.render("jobs", {results: rows}); // Renders handlebar file and context Obj
		};
	});
	});

// Insert Job
app.post('/jobs', (req, res) => {
	var sql = "INSERT INTO Jobs (job_title, hourly_rate) VALUES (?,?)";
	var inserts = [req.body.job_title, req.body.hourly_rate];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			console.log('Job added');
			res.redirect('/jobs');
		}
	});
});

// Menu Page
app.get("/menu", (req, res, next) => {
	let selectMenu = 'SELECT * FROM Drinks';
	let selectinventory = 'Select Inventory.product_ID, Inventory.name FROM Inventory';
	// Select menu
	let context = {};
	mysql.pool.query(selectMenu, (err, rows, fields) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Successful drinks select');
			context['results'] = rows; // Restults of query
			// Select Inventory
			mysql.pool.query(selectinventory, (err, inventoryRows) => {
				if (err) {
					console.log(err);
				} else {
					console.log('successful inventory query');
					context['inventory'] = inventoryRows; // results of query
					res.render("menu", context); // Renders handlebar file and context Obj
				};
			});
		};
	});
});

// Insert Menu Item
app.post('/menu', (req, res) => {
	// var mysql = req.app.get('mysql');
	var sql = "INSERT INTO Drinks (drink_name, ingredient_1, ingredient_2, ingredient_3, ingredient_4, ingredient_5, price) VALUES (?,?,?,?,?,?,?)";
	var inserts = [req.body.drink_name, req.body.ingredient_1, req.body.ingredient_2, req.body.ingredient_3, req.body.ingredient_4, req.body.ingredient_5, req.body.price];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			console.log('Menu Item added');
			res.redirect('/menu');
		}
	});
});

// Inventory Page
app.get("/inventory", (req, res, next) => {
	let selectInventory = 'SELECT * FROM Inventory';
	// Adds query to datatbase. Sends data to render file
	mysql.pool.query(selectInventory, (err, rows, fields) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Successful inventory select');
			console.log(rows);
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
