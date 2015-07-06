/*
    Used to perform CRUD action against the Users collection in the db.
 */
var passport = require('../config/passport.js')();
var User = require('../models/user.js');

(function () {
    'use strict';

    module.exports = function(app){

        // Routes:
        var userRoute = app.route('/users');
        userRoute.get(passport.isTokenValid, readUsers);
        userRoute.post(createUser);        // Unprotected route, no authorization required to create new users (sign up)
                                           // TODO: this route is unsafe for production, find a better solution.
        function readUsers(req, res){
            var retMessage = "OK";
            User.find({}, function (err, documents) {
                if(err){
                    retMessage = "Failed to read users";
                    console.log(retMessage + ": " + err);
                    res.status(500).send({"status":retMessage, "documents": documents});
                }else{
                    res.send({"status":retMessage, "documents": documents});
                }
            });
        }
        function createUser(req, res){
            var retMessage = 'OK';
            var newUser = new User(req.body);

            newUser.save(function (err) {
                if(err){
                    retMessage = 'Failed to save user.';
                    console.log(retMessage + ' ' + err);
                    res.status(500).send('{"status":"' + retMessage + '"}');
                }else{
                    res.send('{"status":"' + retMessage + '"}');
                }
            });
        }
    };
})();

