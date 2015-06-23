var fs = require('fs');
var https = require('https');

var key_file = __dirname + '/gdtest.key';
var crt_file = __dirname + '/gdtest.crt';
var passPhrase = "öwjfoaisjf12053485ödjf";

(function () {
    'use strict';

    module.exports = function(){
        var module = {};

        var options = {
            key: fs.readFileSync(key_file),
            cert: fs.readFileSync(crt_file)
        };
        if(passPhrase){
            options.passphrase = passPhrase;
        }

        module.options = options;
        module.httpsModule = https;

        return module;
    }
})();