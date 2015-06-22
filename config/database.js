var mongoose = require('mongoose');

(function () {
    'use strict';

    module.exports = function(){
        var module = {};

        var dbConnectionString = 'mongodb://localhost:27017/journal'
        mongoose.connect(dbConnectionString);
        var db = mongoose.connection;

        return module;
    };

})();