// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Here we define a port to listen to
var PORT = 8080;

//Use express
var app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// variables for tables and reserve
// var customers = [];
var tables = [];
var waitlist = [];
const MAX_TABLES = 5;

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

// Basic route that sends the user first to the AJAX Page
app.get("/home", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/assets/js/make-reservation.js", function(req, res) {
  res.sendFile(path.join(__dirname, "assets/js/make-reservation.js"));
});

app.post("/api/tables", function(req, res) {
  var newCustomer = req.body;
  console.log(newCustomer);
	if(tables.length <= MAX_TABLES) {
		tables.push(newCustomer);
		alert("You table awaits, this way please!");
	} else {
		waitlist.push(newCustomer);
		alert("Sorry, you are placed in waiting list.");
	}
  	console.log(tables);
  	console.log(waitlist);
	// We then display the JSON to the users
  var result = {
    "tables": tables,
    "waitlist": waitlist
  }
	res.json(result);
})

app.get("/api/displayTables", function(req, res) {
  // We then display the JSON to the users
  res.json(tables);
});

app.get("/api/reserve", function(req, res) {
  // We then display the JSON to the users
  res.json(waitlist);
});

app.listen(PORT, function() {
  // The below statement is triggered (server-side) when a user visits the PORT URL
  console.log("Server listening on: http://localhost:%s", PORT);
});