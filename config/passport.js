var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
//var ClientJWTBearerStrategy = require('passport-oauth2-jwt-bearer').Strategy;
var BearerStrategy = require('passport-http-bearer');
var User = require('../models/user.js');

(function () {
    'use strict';

    module.exports = function(){
        var module = {};

        passport.use('basic', new BasicStrategy(
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
                            console.log("User %s provided incorrect password.", username);
                            return callback(null, false);
                        }

                        //Password matched:
                        return callback(null, user);
                    });
                });
            }
        ));

        passport.use('bearer', new BearerStrategy(
            function (token, callback) {
                //TODO: Verify token, validate for authenticity!, check if expired...
                User.findOne({token: token}, function(err, user){
                    if(err){
                        return callback(err);
                    }

                    //No user found with that token:
                    if(!user){
                        console.log("Failed to authenticate user with specified token, not found in db.");
                        return callback(null, false);
                    }

                    return callback(null, user);
                });
            }
        ));

        module.isAuthenticated = passport.authenticate('basic', {session : false});  // Use for authentication at login
        module.isTokenValid = passport.authenticate('bearer', {session : false});    // Use to protect any other route

        return module;
    };

})();
