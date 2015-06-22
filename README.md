# JournalNodeSRV
A notebook for misc purposes, server side.

# Purpose of this project
This is an educational project with an aim to show/test a couple of neat techniques related to the MEAN.io.
Number of functional features is intentionally kept low as the focus is on the techniques.
The aim is: a HTTP(S) RESTful web API using token based authentication.

# Techniques demonstrated
RESTful web API built using nodejs, express, passport...

# Interact with this API
Build a client or use Postman to:
* Send a GET request to http://localhost:5000/ping  // Should respond with "pong".
* Send a POST request to http://localhost:5000/ping // Should respond with what POST sent.
                                                    // Be sure to set in header "Content-Type" to "application/json"
* Send a GET request to http://localhost:5000/notes // Should respond with all notes in db.
* Send a POST request to http://localhost:5000/notes // In Postman set body to 'raw' and '{"note" : "First note"}'
                                                     // In Postman set header "Content-Type" to "application/json"
                                                     // Should respond with {"status":"OK"} and the note should be
                                                     // saved in db with the timeStamp set to current time.