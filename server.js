var http = require('http');
var https = require('https');
var httpsCfg = require('./config/https.js')();

var app = null;

// Config express:
var expressCfg = require('./config/express.js')(app);
app = expressCfg.app;

// Database:
require('./controllers/databaseCtrl.js')().connect();

// Routes:
if(app.get('env') === 'development'){
    require('./controllers/pingCtrl.js')(app);
}
require('./controllers/loginCtrl.js')(app);
require('./controllers/notesCtrl.js')(app);
require('./controllers/usersCtrl.js')(app);

// Server, listen for requests:
http.createServer(app).listen(expressCfg.port, function () {
    console.log("Server listening on port: " + expressCfg.port);
});
var httpsPort = expressCfg.port + 1;
https.createServer(httpsCfg.options, app).listen(httpsPort, function () {
    console.log("Server listening on port: " + httpsPort + " (for HTTPS requests)");
});