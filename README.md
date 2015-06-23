# JournalNodeSRV
A notebook for misc purposes, server side.

# Purpose of this project
This is an educational project with an aim to show/test a couple of neat techniques related to the MEAN.io.
Number of functional features is intentionally kept low as the focus is on the techniques.
The aim is: a HTTP(S) RESTful web API using token based authentication.

# Techniques demonstrated
RESTful web API built using nodejs, express, passport...

# Interact with this API
Here is described how to use Google's POSTMAN to interact with the API.

The port (in examples below 5000) is set in /config/express.js
Change the port in the examples below to 5001 to access the server via HTTPS.
(a self-signed certificate will have to be accepted by the browser)

When doing a POST set body to 'raw' and for instance '{"note" : "First note"}' also be sure to
set header "Content-Type" to "application/json". (the letter is for the body-parser to work)

Build a client or use Postman to:
* Send a GET request to http://localhost:5000/ping  // Should respond with "pong".
* Send a POST request to http://localhost:5000/ping // Should respond with what POST sent.

* Send a GET request to http://localhost:5000/notes // Should respond with all notes in db.
* Send a POST request to http://localhost:5000/notes // Should respond with {"status":"OK"} and the note should be
                                                     // saved in db with the timeStamp set to current time.
* Send a POST request to http://localhost:5000/notes // Should respond with {"status":"<ERROR MESSAGE>"}.

* Send a GET request to http://localhost:5000/users  // Should respond with all users in db.
* Send a POST request to http://localhost:5000/users // In body of the POST request send for instance:
                                                     // {"username":"wojjas", "password":"007"}, Should add user to db.
                                                     // is password is omitted or already existing username specified:
                                                     // server should respond with {"status":"<ERROR MESSAGE>"}.