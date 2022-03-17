const helpers = require("./public/helpers/helperObj.js").obj; // helper functions
const urls = require("./utility/url_lookup.js").urls; // table lookup for url functions. Used for delete function

// Express set up
let express = require("express");
let app = express();

// Sets up database and creates tables
let mysql = require("./database/dbcon.js");
require('./database/import.js');

// Set up body parser
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 // Set up handlebars
 let handlebars = require("express-handlebars").create({
	defaultLayout:"main",
	helpers: helpers
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set('views', './views');

// Sets static directory to public
app.use(express.static('public'));

app.set('port', process.argv[2]); // port set

// Gets list of jobs for filtered employees page
function getJobs(res, sql, context, complete){
	sql.pool.query('SELECT * FROM Jobs', (err, rows, fields) => {
		if (err) {
			console.log(err);
		} else {
			context["jobs"] = rows;
			complete();	
		}
	}) ;
};

// Gets list of jobs for filtered employees page
function getEmployees(req, res, sql, context, complete){
	let job_id = parseInt(req.params.job_id)
	let selectEmployees = `SELECT * FROM Employees LEFT JOIN Jobs ON Employees.job_code = Jobs.job_code WHERE Jobs.job_code = ${job_id}`;
	var inserts = [req.params.job_id]
	sql.pool.query(selectEmployees, inserts, function(error, results, fields){
		  if(error){
			  res.write(JSON.stringify(error));
			  res.end();
		  }
		  context.results = results;
		  complete();
	  });
};

// Gets Employee Details to be updated
function getEmp(res, mysql, context, id, complete) {
	var sql = "SELECT employee_ID, first_name, last_name, telephone, job_code, start_date FROM Employees WHERE employee_ID = ?";
	var inserts = [id];
	mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error) {
			res.write(JSON.stringify(error));
			res.end();
		}
		context.employee = result[0];
		complete;
	})
};

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
	context.jsscripts = ["delete.js", "filter.js"];
	context.events = "/scripts/errorCheck.js";
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
				// console.log(context)
				// Render to employee.handlebars
				res.render("employee", context);
				};
			});
		};
	});
});

// Update Employee Page
app.get("/updateEmp/:id", (req, res, next) => {
	let selectEmployees = 'SELECT * FROM Employees WHERE employee_ID = (?)';
	let jobValues = 'SELECT * FROM Jobs';
	let insert = [req.params.id];
	let context = {};
	context.events = "/scripts/errorCheck.js";
	// Select employees query
	mysql.pool.query(selectEmployees, insert, (err, rows, fields) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Successful employees select');
			context["results"] = rows; // results of query
			console.log(context);
			// Select Jobs query
			mysql.pool.query(jobValues, (err, jobrows, jobsfields) => {
				if (err) {
					console.log(err);
				} else {
				console.log('Successful jobs select');
				context["jobs"] = jobrows; // results of query
				// Render to employee.handlebars
				res.render("updateEmp", context);
					};
				});
			};
		});
	});

// Update Employee Query
app.post("/employees/:id", (req, res, next) => {
	var sql = 'UPDATE Employees SET first_name=?, last_name=?, telephone=?, job_code=?, start_date=? WHERE employee_ID=?';
	var inserts = [req.body.first_name, req.body.last_name, req.body.telephone, req.body.job_code, req.body.start_date, req.params.id];
	mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error) {
			res.write(JSON.stringify(error));
			res.end();
		} else {
			console.log('Employee Updated');
			res.redirect("/employees");
		}
	});
});
	
// Insert Employee
app.post("/employees", (req, res) => {
	var sql = 'INSERT INTO Employees (first_name, last_name, telephone, job_code, start_date) VALUES (?,?,?,?,?)';
	var inserts = [req.body.first_name, req.body.last_name, req.body.telephone, req.body.job_code, req.body.start_date];
	mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			console.log('Employee added');
			res.redirect("/employees");
		}
	});
});


// Events Page
app.get("/events", (req, res, next) => {
	let selectEvents = 'SELECT Events.event_ID, Events.event_name, Events.event_date, Events.employee_1, Events.employee_2, Events.employee_3, Events.employee_4, Events.employee_5, Events.guest_count, Drinks.drink_name AS drink_special FROM Events LEFT JOIN Drinks ON Events.menu_item = Drinks.menu_item';
	let selectDrinks = 'SELECT * FROM Drinks';
	let selectEmployees = 'Select Employees.employee_ID, Employees.first_name, Employees.last_name FROM Employees';
	let context = {}
	context.jsscripts = ["delete.js"];
	context.events = "/scripts/errorCheck.js";
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
				mysql.pool.query(selectEmployees, (err, empRows) => {
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
	
// Update Events Page
app.get("/updateEvent/:id", (req, res, next) => {
    let selectEvents = 'SELECT Events.event_ID, Events.event_name, Events.event_date, Events.employee_1, Events.employee_2, Events.employee_3, Events.employee_4, Events.employee_5, Events.guest_count, Drinks.drink_name AS drink_special FROM Events LEFT JOIN Drinks ON Events.menu_item = Drinks.menu_item WHERE event_ID = (?)';
	let selectEmployees = 'Select Employees.employee_ID, Employees.first_name, Employees.last_name FROM Employees';
	let selectDrinks = 'SELECT * FROM Drinks';
	let insert = [req.params.id];
	let context = {};
	context.events = "/scripts/errorCheck.js";
    // Select Events
	mysql.pool.query(selectEvents, insert, (err, rows, fields) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Successful events select');
			context['results'] = rows; // results of query
	// Select Employees
	mysql.pool.query(selectEmployees, (err, empRows) => {
		if (err) {
			console.log(err);
		} else {
			console.log('successful employees query')
			context['employees'] = empRows; // results of query
		// Select Drink
		mysql.pool.query(selectDrinks, (err, drinkrows) => {
			if (err) {
				console.log(err);
			} else {
			console.log('successful drink query');
			context['drinks'] = drinkrows;
			res.render("updateEvent", context);
				};
			});
		  };
		});
	  };
   });
});

// Update Events Query
app.post("/events/:id", (req, res, next) => {
	var sql = 'UPDATE Events SET event_name=?, event_date=?, employee_1=?, employee_2=?, employee_3=?, employee_4=?, employee_5=?, guest_count=?, menu_item=? WHERE event_ID=?';
	var inserts = [req.body.event_name, req.body.event_date, req.body.employee_1, req.body.employee_2, req.body.employee_3, req.body.employee_4, req.body.employee_5, req.body.guest_count, req.body.menu_item, req.params.id];
	for (let index = 2; index < 7; index++) { // Null Check
		if (inserts[index] == "") {
			inserts[index] = null;
		};
	};
	mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error) {
			res.write(JSON.stringify(error));
			res.end();
		} else {
			console.log('Event Updated');
			res.redirect("/events");
		}
	});
});

//Insert Event
app.post("/events", (req, res) => {
	var sql = 'INSERT INTO Events (event_name, event_date, employee_1, employee_2, employee_3, employee_4, employee_5, guest_count, menu_item) VALUES (?,?,?,?,?,?,?,?,?)';
	var inserts = [req.body.event_name, req.body.event_date, req.body.employee_1, req.body.employee_2, req.body.employee_3, req.body.employee_4, req.body.employee_5, req.body.guest_count, req.body.menu_item];
	for (let index = 2; index < 7; index++) { // Null Check
		if (inserts[index] == "") {
			inserts[index] = null;
		};
	};
	mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			console.log('Event added');
			res.redirect("/events");
		}
	});
});


// Jobs Page
app.get("/jobs", (req, res, next) => {
	let selectJobs = 'SELECT * FROM Jobs';
	let context = {}
	context.jsscripts = ["delete.js"];
	context.events = "/scripts/errorCheck.js";
	// Adds query to datatbase. Sends data to render file
	mysql.pool.query(selectJobs, (err, rows, fields) => {
		if (err) {
			console.log(err);
		} else {
			context['results'] = rows; // results of query
			console.log('Successful jobs select');
			res.render("jobs", context); // Renders handlebar file and context Obj
		};
	});
});

// Update Job Page
app.get("/updateJob/:id", (req, res, next) => {
    let selectJob = 'Select * FROM Jobs WHERE job_code=(?)';
	let insert = [req.params.id];
	let context = {};
	context.events = "/scripts/errorCheck.js";
    mysql.pool.query(selectJob, insert, (err, rows, fields) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Successful Job select');
			context['results'] = rows; // results of query
			res.render("updateJob", context);
  		};
	});
});

// Update Job Query
app.post("/jobs/:id", (req, res, next) => {
	var sql = 'UPDATE Jobs SET job_title=?, hourly_rate=? WHERE job_code=?';
	var inserts = [req.body.job_title, req.body.hourly_rate, req.params.id];
	mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error) {
			res.write(JSON.stringify(error));
			res.end();
		} else {
			console.log('Job Updated');
			res.redirect("/jobs");
		}
	});
});

// Insert Job
app.post("/jobs", (req, res) => {
	var sql = 'INSERT INTO Jobs (job_title, hourly_rate) VALUES (?,?)';
	var inserts = [req.body.job_title, req.body.hourly_rate];
	mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			console.log('Job added');
			res.redirect("/jobs");
		}
	});
});


// Menu Page
app.get("/menu", (req, res, next) => {
	let selectMenu = 'SELECT * FROM Drinks';
	let selectinventory = 'Select Inventory.product_ID, Inventory.name FROM Inventory';
	// Select menu
	let context = {};
	context.jsscripts = ["delete.js"];
	context.events = "/scripts/errorCheck.js";
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

// Update Menu Page
app.get("/updateMenu/:id", (req, res, next) => {
    let selectMenu = 'SELECT * FROM Drinks WHERE menu_item=(?)';
	let selectinventory = 'Select Inventory.product_ID, Inventory.name FROM Inventory';
	let insert = [req.params.id];
	let context = {};
    context.events = "/scripts/errorCheck.js";
	// Select Menu Item
	mysql.pool.query(selectMenu, insert, (err, rows, fields) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Successful Drink select');
			context['results'] = rows; // Restults of query
		// Select Inventory
		mysql.pool.query(selectinventory, (err, inventoryRows) => {
			if (err) {
				console.log(err);
			} else {
				console.log('successful inventory query');
				context['inventory'] = inventoryRows; // results of query
				res.render("updateMenu", context); // Renders handlebar file and context Obj
				};
			});
  		};
	});
});

// Update Drinks Query
app.post("/menu/:id", (req, res, next) => {
	var sql = 'UPDATE Drinks SET drink_name=?, ingredient_1=?, ingredient_2=?, ingredient_3=?, ingredient_4=?, ingredient_5=?, price=? WHERE menu_item=?';
	var inserts = [req.body.drink_name, req.body.ingredient_1, req.body.ingredient_2, req.body.ingredient_3, req.body.ingredient_4, req.body.ingredient_5, req.body.price, req.params.id];
	mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error) {
			res.write(JSON.stringify(error));
			res.end();
		} else {
			console.log('Menu Updated');
			res.redirect("/menu");
		}
	});
});

// Insert Menu Item
app.post("/menu", (req, res) => {
	// var mysql = req.app.get('mysql');
	var sql = 'INSERT INTO Drinks (drink_name, ingredient_1, ingredient_2, ingredient_3, ingredient_4, ingredient_5, price) VALUES (?,?,?,?,?,?,?)';
	var inserts = [req.body.drink_name, req.body.ingredient_1, req.body.ingredient_2, req.body.ingredient_3, req.body.ingredient_4, req.body.ingredient_5, req.body.price];
	for (let index = 2; index < 6; index++) { // Null Check
		if (inserts[index] == "") {
			inserts[index] = null;
		};
	};
	mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			console.log('Menu Item added');
			res.redirect("/menu");
		}
	});
});

// Inventory Page
app.get("/inventory", (req, res, next) => {
	let selectInventory = 'SELECT * FROM Inventory';
	let context = {}
	context.jsscripts = ["delete.js"];
	context.events = "/scripts/errorCheck.js";
	// Adds query to datatbase. Sends data to render file
	mysql.pool.query(selectInventory, (err, rows, fields) => {
		if (err) {
			console.log(err);
		} else {
			context['results'] = rows; // results of query
			console.log('Successful inventory select');
			res.render("inventory", context);
		};
	});
	});

// Update Inventory Item Page
app.get("/updateInv/:id", (req, res, next) => {
    let selectInventory = 'SELECT * FROM Inventory WHERE product_ID=(?)';
	let insert = [req.params.id];
	let context = {};
    context.events = "/scripts/errorCheck.js";
	mysql.pool.query(selectInventory, insert, (err, rows, fields) => {
		if (err) {
			console.log(err);
		} else {
			context['results'] = rows; // results of query
			console.log('Successful inventory select');
			res.render("updateInv", context);
			};
		});
	});

// Update Inventory Item Query
app.post("/inventory/:id", (req, res, next) => {
	var sql = 'UPDATE Inventory SET name=?, category=?, btl_cost=?, cse_cost=?, distributor=? WHERE product_ID=?';
	var inserts = [req.body.name, req.body.category, req.body.btl_cost, req.body.cse_cost, req.body.distributor, req.params.id];
	for (let index = 2; index < 4; index++) { // Null Check
		if (inserts[index] == "") {
			inserts[index] = null;
		};
	};
	mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error) {
			res.write(JSON.stringify(error));
			res.end();
		} else {
			console.log('Item Updated');
			res.redirect("/inventory");
		}
	});
});

// Insert Item
app.post("/inventory", (req, res) => {
	var sql = 'INSERT INTO Inventory (name, category, btl_cost, cse_cost, distributor) VALUES (?,?,?,?,?)';
	var inserts = [req.body.name, req.body.category, req.body.btl_cost, req.body.cse_cost, req.body.distributor];
	for (let index = 2; index < 4; index++) { // Null Check
		if (inserts[index] == "") {
			inserts[index] = null;
		};
	};
	mysql.pool.query(sql, inserts, function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			console.log('Item added');
			res.redirect("/inventory");
		}
	});
});

// Deleting items from database
app.delete('/:id', function(req, res){
	let url = `http://${req.headers.host}`;
	let tableName = req.headers.referer;
	let table = urls[tableName.slice(url.length)][0]; // gets table name
	let id =  urls[tableName.slice(url.length)][1]; // get id
	let sql = `DELETE FROM ${table} WHERE ${id} = ?`;
	var inserts = [req.params.id];
	mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
			console.log(error)
			res.write(JSON.stringify(error));
			res.status(400);
			res.end();
		}else{
			res.status(202).end();
		}
	});
});

// Display all people from a given job_id.
app.get('/employees/filter/:job_id', (req, res, next) => {
	let context = {};
	let callbackCount = 0;
	context.jsscripts = ["delete.js", "filter.js"];
	context.events = "/scripts/errorCheck.js";
	getJobs(res, mysql, context, complete);
	getEmployees(req, res, mysql, context, complete)
	function complete(){
		callbackCount++;
		if(callbackCount >= 2){
			res.render('employee', context);
		}
	}

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
