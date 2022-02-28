let express = require("express");
let app = express();
let handlebars = require("express-handlebars").create({defaultLayout:"main"});
let bodyParser = require("body-parser");
let mysql = require("./database/dbcon.js");
const e = require("express");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set('port', process.argv[2]);
app.use(express.static("public"));

// Creates table and populates with sample data
require('./database/import.js');


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
			context["results"] = rows;
			// Select Jobs query
			mysql.pool.query(jobValues, (err, jobrows, jobsfields) => {
				if (err) {
					console.log(err);
				} else {
				console.log('Successful employees select');
				context["jobs"] = jobrows;
				// Render to employee.handlebars
				res.render("employee", context);
				};
			});
		};
	});
});

// Events Page
app.get("/events", (req, res, next) => {
	let selectEvents = 'SELECT Events.event_name, Events.event_date, Events.employee_1, Events.employee_2, Events.employee_3, Events.employee_4, Events.employee_5, Events.guest_count, Drinks.drink_name AS drink_special FROM Events LEFT JOIN Drinks ON Events.menu_item = Drinks.menu_item LEFT JOIN Employees ON Events.employee_1 = Employees.employee_ID';
	let selectDrinks = 'SELECT * FROM Drinks';
	let selctEmployees = 'Select Employees.employee_ID, Employees.first_name, Employees.last_name FROM Employees'
	// Adds query to datatbase. Sends data to render file
	let context = {}
	// Select Events
	mysql.pool.query(selectEvents, (err, rows, fields) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Successful events select');
			context['results'] = rows;
			// Select Drinks
			mysql.pool.query(selectDrinks, (err, drinkrows) => {
				if (err) {
					console.log(err);
				} else {
				context['drinks'] = drinkrows;
				// Select Employees
				mysql.pool.query(selctEmployees, (err, empRows) => {
					if (err) {
						console.log(err);
					} else {
						context['employees'] = empRows;
						console.log(context.employees);
						res.render("events", context);	
							};
						});
					};
				});
			};
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
			res.render("jobs", {results: rows});
		};
	});
	});

// Menu Page
app.get("/menu", (req, res, next) => {
	let selectMenu = 'SELECT * FROM Drinks';
	// Adds query to datatbase. Sends data to render file
	mysql.pool.query(selectMenu, (err, rows, fields) => {
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
	mysql.pool.query(selectInventory, (err, rows, fields) => {
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

// SELECT 
// Events.event_name, 
// Events.event_date, 
// Events.employee_1, 
// Events.employee_2, 
// Events.employee_3, 
// Events.employee_4, 
// Events.employee_5, 
// Events.guest_count,
// Drinks.drink_name AS drink_special
// FROM Events
// LEFT JOIN Drinks ON
// Events.menu_item = Drinks.menu_item
// LEFT JOIN Employees ON
// Events.employee_1 = Employees.employee_ID;