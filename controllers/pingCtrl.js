(function () {
    'use strict';

    module.exports = function(app){
        var pingRoute = app.route('/ping');         // for debug purposes

        function timeStamp(){
            return Math.floor(Date.now() / 1000);
        }

        pingRoute.get(function(req, res){
            res.send('pong ' + timeStamp());
        });
        pingRoute.post(function (req, res) {
            res.send({"message": "Mirroring received, seconds since epoc: " + timeStamp(),
                "headers" : req.headers,
                "body" : req.body
            });
        })
    };

})();

