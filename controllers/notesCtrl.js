/*
* Used to perform CRUD action against the Notes collection in the db.
* */
var Note = require('../models/note.js');
var passport = require('../config/passport.js')();

(function () {
    'use strict';

    module.exports = function(app){

        // Routes:
        var noteRoute = app.route('/notes');
        noteRoute.get(passport.isTokenValid, readNotes);
        noteRoute.post(passport.isTokenValid, createNote);

        function readNotes(req, res){
            var retMessage = "OK";
            Note.find({}, function (err, documents) {
                if(err){
                    retMessage = "Failed to read notes";
                    console.log(retMessage + ": " + err);
                    res.status(500).send({"status":retMessage, "documents": documents});
                }else{
                    res.send({"status":retMessage, "documents": documents});
                }
            });
        }
        function createNote(req, res){
            var retMessage = 'OK';
            var newNote = new Note(req.body);

            newNote.save(function (err) {
                if(err){
                    retMessage = 'Failed to save note.';
                    console.log(retMessage + ' ' + err);
                    res.status(500).send({"status":retMessage});
                }else{
                    res.send('{"status":"' + retMessage + '"}');
                }
            });
        }
    };

})();

