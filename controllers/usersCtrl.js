var mongoose = require('mongoose');
var User = require('../models/user.js');

(function () {
    'use strict';

    module.exports = function(app){

        // Routes:
        var userRoute = app.route('/users');
        userRoute.get(readUsers);
        userRoute.post(createUser);

        function readUsers(req, res){
            var retMessage = "OK";
            User.find({}, function (err, documents) {
                if(err){
                    retMessage = "Failed to read users";
                    console.log(retMessage + ": " + err);
                }

                res.send({"status":retMessage, "documents": documents});
            });
        }
        function createUser(req, res){
            var retMessage = 'OK';
            var newUser = new User(req.body);

            newUser.save(function (err) {
                if(err){
                    retMessage = 'Failed to save user.';
                    console.log(retMessage + ' ' + err);
                }

                res.send('{"status":"' + retMessage + '"}');
            });
        }
    };

})();

