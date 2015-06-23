var bodyParser   = require('body-parser');
var express = require('express');
var passport = require('passport');

(function () {
    'use strict';

    module.exports = function(app){
        var module = {};

        app = express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(passport.initialize());

        module.port = process.env.PORT || 5000;
        module.app = app;

        return module;
    };

})();
