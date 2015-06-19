var express = require('express');
var app = express();
var port     = process.env.PORT || 5000;

app.get('/ping', function(req, res){
    res.send('pong');
});

app.listen(port);