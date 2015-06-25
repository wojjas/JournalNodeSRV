var jwt = require('jwt-simple');
var passport = require('../config/passport.js')();
var User = require('../models/user.js');

(function () {
    'use strict';

    module.exports = function(app){

        // Routes:
        app.get('/users/login', passport.isAuthenticated, getLogin);
        app.post('/users/login', postLogin);

        function getLogin(req, res){
            var retMessage = "OK";
            var user = req.user._doc; // We only get here if we manage to authenticate the request, and then the user is known.

            // Create token, save it to db and return it to client:
            user.token = createToken(user);
            updateUserWithToken(user, retMessage, function (token, retMessage) {
                res.send({"status":retMessage, "token":token});
            });
        }

        //POST this route is unprotected. It expects a username and password. If gotten they are matched against the db. If user
        //is found and password matched a token is created, saved to db and sent to client. Thus the result is the same as in GET
        //above.
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
                                updateUserWithToken(user._doc, retMessage, function (token, retMessage) {
                                    res.send({"status":retMessage, "token":token});
                                });
                            }
                        })
                    }
                });
            }
        }

        function createToken(user){
            var payload = {
                "iss":user.username
                //"exp":Date.now().getTime() + 60 * 60 * 1000 // valid for one hour
            }
            //TODO: use a better secret
            var secret = 'Should I use certificates private key for this?';

            return jwt.encode(payload, secret);
        }
        function updateUserWithToken(user, retMessage, callback){
            User.update({"_id":user._id}, user, function (err) {
                if(err){
                    console.log('Failed to update user token, ', err);
                    retMessage = 'Failed to login.';
                }

                callback(user.token, retMessage);
            });
        }
    };

})();

