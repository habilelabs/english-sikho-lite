// server.js

// set up constants ===============================================================
var port = process.env.PORT || 80;

var viewDirectory = "/app/view";
var webRootDirectory = "/app/webroot";
if (process.env.NODE_ENV === "production") {
	port = process.env.PORT || 3000;
    viewDirectory = "/app/view";
    webRootDirectory = "/app/webroot";
}

// get all the tools we need ======================================================
var express = require('express');
var app = express();
var compression = require('compression');
var expressLayouts = require('express-ejs-layouts');
var fs = require('fs');

// configuration ===============================================================


// enable third pary modules ===================================================
app.use(compression());

// use EJS and layout ==========================================================
app.set('view engine', 'ejs');
app.set('layout', 'defaultLayout');
app.use(expressLayouts);

// config view =================================================================
app.set('views', __dirname + viewDirectory);
app.use(express.static(__dirname + webRootDirectory));

// body parder for api and port setting ========================================
app.set('port', port);

// load all controller =========================================================
var controller_loc = __dirname + '/app/controller';
var controller_files = fs.readdirSync(controller_loc);
controller_files.forEach(function (file) {
    return (require(controller_loc + '/' + file))(app);
});

// routes ======================================================================
require('./app/routes')(app);



// Start the Server ==============================================================
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
