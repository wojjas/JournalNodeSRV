var mongoose = require('mongoose');
var Note = require('../models/note.js');

(function () {
    'use strict';

    module.exports = function(app){

        // Routes:
        var noteRoute = app.route('/notes');
        noteRoute.get(readNotes);
        noteRoute.post(createNote);

        function readNotes(req, res){
            var retMessage = "OK";
            Note.find({}, function (err, documents) {
                if(err){
                    retMessage = "Failed to read notes";
                    console.log(retMessage + ": " + err);
                }

                res.send({"status":retMessage, "documents": documents});
            });
        }
        function createNote(req, res){
            var retMessage = 'OK';
            var newNote = new Note(req.body);

            newNote.save(function (err) {
                if(err){
                    retMessage = 'Failed to save note.';
                    console.log(retMessage + ' ' + err);
                }

                res.send('{"status":"' + retMessage + '"}');
            });
        }
    };

})();

