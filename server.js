var http = require('http');
var app = null;

// Config express:
var expressCfg = require('./config/express.js')(app);
app = expressCfg.app;

// Routes:
require('./controllers/pingCtrl.js')(app);

http.createServer(app).listen(expressCfg.port, function () {
    console.log("Server listening on port: " + expressCfg.port);
});