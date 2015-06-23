var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user.js');

(function () {
    'use strict';

    module.exports = function(){
        var module = {};

        passport.use(new BasicStrategy(
            function (username, password, callback) {
                User.findOne({username: username}, function(err, user){
                    if(err){
                        return callback(err);
                    }

                    //No user found with that user name:
                    if(!user){
                        console.log("User %s failed to login, not found in db.", username);
                        return callback(null, false);
                    }

                    //Make sure the password is correct:
                    user.verifyPassword(password, function(err, isMatch){
                        if(err){
                            return callback(err);
                        }

                        //Password did not match:
                        if(!isMatch) {
                            console.log("User %s provided an incorrect password.", username);
                            return callback(null, false);
                        }

                        //Password matched:
                        return callback(null, user);
                    });
                });
            }));

        module.isAuthenticated = passport.authenticate('basic', {session : false});

        return module;
    };

})();
