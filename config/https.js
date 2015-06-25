var fs = require('fs');
var https = require('https');

var key_file = __dirname + '/gdtest.key';
var crt_file = __dirname + '/gdtest.crt';
//TODO: use a better passPhrase
var passPhrase = "use a better passPhrase";

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