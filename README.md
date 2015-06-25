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
* Route ping is only available in development mode, that is if: app.get('env') === 'development'.
* Send a GET request to http://localhost:5000/ping  // Should respond with "pong".
* Send a POST request to http://localhost:5000/ping // Should respond with what POST sent.

* Send a POST request to http://localhost:5000/users // In body of the POST request send for instance:
                                                     // {"username":"wojjas", "password":"007"}, Should add user to db.
                                                     // if password is omitted or a already existing username specified:
                                                     // server should respond with {"status":"<ERROR MESSAGE>"}.

* Basic Auth, Username and Password have to be provided to access all routes besides /ping and POST to /users, that is
  all the routes below: (DEPRECATED, AS NEWER VERSION USES TOKENS, SEE BELOW)

* Send a GET request to http://localhost:5000/users  // Should respond with all users in db.

* Send a GET request to http://localhost:5000/notes // Should respond with all notes in db.
* Send a POST request to http://localhost:5000/notes // Should respond with {"status":"OK"} and the note should be
                                                     // saved in db with the timeStamp set to current time.
* Send a POST request to http://localhost:5000/notes // Should respond with {"status":"<ERROR MESSAGE>"}.


* Token based authorization. The user authenticates requesting /login with either GET or POST:
GET this route is guarded with passportjs' Basic Strategy, if user's credentials are verified passport sets req.user and
the request is handled creating a token, saving it to the db (for the user in question) and sending it to the client.
 or
POST this route is unprotected. It expects a username and password. If gotten they are matched against the db. If user
is found and password matched a token is created, saved to db and sent to client. Thus the result is the same as in GET
above.

All routes besides /users/login and /ping are protected with passportjs' Bearer Strategy, expecting a token.
Send the token from POSTMAN as a header param:
Authorization   Bearer <gotten-token>

