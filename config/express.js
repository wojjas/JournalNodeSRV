var bodyParser   = require('body-parser');
var express = require('express');

(function () {
    'use strict';

    module.exports = function(app){
        var module = {};

        app = express();
        app.use(bodyParser.json()); // get information from html forms
        app.use(bodyParser.urlencoded({ extended: true }));

        module.port = process.env.PORT || 5000;
        module.app = app;

        return module;
    };

})();
