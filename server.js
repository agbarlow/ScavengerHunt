// Dependencies
var express = require("express");
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var methodOverride = require('method-override');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var session = require('client-sessions');

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;



app.engine("handlebars", exphbs({ defaultLayout: "main" }));

app.set("view engine", "handlebars");

app.use(express.static(process.cwd() + '/public'));

app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));

var mysql = require("mysql");

app.use(methodOverride('_method'));


// BodyParser makes it possible for our server to interpret data sent to it.
// The code below is pretty standard.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
//adding express validator and cookie parser
app.use(expressValidator());
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));
app.use(cookieParser());
// The below points our server to a series of "route" files.
var routes=require("./controllers/controllers.js");
app.use('/', routes);
// catch 404 and forward to error handler


var db=require("./models")



// The below code effectively "starts" our server
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
