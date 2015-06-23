var mongoose = require('mongoose');

(function () {
    'use strict;'

    var NoteSchema = mongoose.Schema({
            note: {type: "String", required: true},
            timeStamp : { type : Date, default: Date.now }  //if unset at save, timeStamp will be set to current time.
        }, {
            collection:'notes'} //Optional but helps to understand what's going on.
    );                          //If omitted mongoose will add an "s" to Note below and
                                //refer to collection notes. Which IMO is not clear.
                                //Specifying the collection explicitly makes this clearer.

    module.exports = mongoose.model('Note', NoteSchema);
})();