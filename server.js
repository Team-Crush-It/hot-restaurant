// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3100;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tables = [];
var waitList = [];

var customer = {
    "customerName": "N/A",
    "phoneNumber": "N/A",
    "customerEmail": "N/A",
    "customerID": "N/A"
    }

    tables.push(customer);


// Routes
// =============================================================
var reservations = [];
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    //newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();
    console.log(newReservation);
    
    if (tables.length > 5){
        newReservation.waitlist = true;
        waitList.push(newReservation)
        res.status(200).json('Waitlisted')
    }else{
        newReservation.waitlist = false;
        tables.push(newReservation)
        res.status(200).json('Available reservation')
    }

    
   
  });


app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitList);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
