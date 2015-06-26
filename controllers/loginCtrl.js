var jwt = require('jwt-simple');
var moment = require('moment');
var passportCfg = require('../config/passport.js')();
var User = require('../models/user.js');

(function () {
    'use strict';

    module.exports = function(app){

        // Routes:
        app.get('/users/login', passportCfg.isAuthenticated, getLogin);
        app.post('/users/login', postLogin);

        // This route is protected, req.user is set when request is authenticated thus known in this function.
        function getLogin(req, res){
            var retMessage = "OK";
            var user = req.user._doc;

            // Create token, and return it to client:
            user.token = createToken(user);
            res.send({"status":retMessage, "token":user.token});
        }

        // This route is unprotected.
        // It expects a username and password.
        // If user is found and password matched a token is created and sent to client.
        function postLogin(req, res){
            var retMessage = "OK";

            if(!req.body || !req.body.username || !req.body.password){
                retMessage = "Failed to login, insufficient credentials provided."
            }else{
                User.findOne({"username":req.body.username}, function (err, user) {
                    if(err){
                        retMessage = "Failed to find user.";
                        console.log(retMessage + ": " + err);
                    }
                    if(!user){
                        retMessage = "Failed to find user.";
                        console.log(retMessage);
                    }else {
                        user.verifyPassword(req.body.password, function (err, isMatch) {
                            err && console.log(err);

                            if(isMatch){
                                user.token = createToken(user);
                                res.send({"status":retMessage, "token":user.token});
                            }
                        })
                    }
                });
            }
        }

        function createToken(user){
            var expires = moment().add('minutes', 2).valueOf();
            var payload = {
                "iss":passportCfg.tokenIssuer,
                "sub":user._id,
                "exp":expires
            }

            return jwt.encode(payload, passportCfg.tokenSecret, 'HS256');
        }
    };

})();

