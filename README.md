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
Further below find examples for using curl.

The port (in examples below 5000) is set in /config/express.js
Change the port in the examples below to 5001 to access the server via HTTPS.
(a self-signed certificate will have to be accepted by the browser)

When doing a POST set body to 'raw' and for instance '{"note" : "First note"}' also be sure to
set header "Content-Type" to "application/json". (the letter is for the body-parser to work)

## Build a client or use Postman to:

Route ping is only available in development mode, that is if: app.get('env') === 'development'.

Type | Route | Response
------------ | ------------- | -------------
GET | http://localhost:5000/ping | The string "pong"
POST | http://localhost:5000/ping | Should respond with what POST sent
POST | http://localhost:5000/users | In body of the POST request send for instance: _{"username":"wojjas", "password":"007"}_ Should add user to db and respond with _{"status":"OK"}_ or _{"status":"error-message"}_

#### Token based authorization. 
The user authenticates requesting /login with either GET or POST: 
(_In both cases a token is returned if credentials are ok._)

Type | Route | Response
------------ | ------------- | -------------
GET | http://localhost:5000/login | This route is guarded with [passportjs'](https://github.com/jaredhanson/passport) Basic Strategy, if user's credentials are verified correctly passportjs sets req.user and the request is handled creating a token (with token.sub = user._id), and sending it to the client.
POST | http://localhost:5000/login | This route is unprotected. It expects a username and password. If gotten they are matched against the db. If user is found and password matched a token with users._id as token.sub is created, and sent to client. Thus the result is the same as in GET above.

All routes besides /users/login and /ping are protected with [passportjs'](https://github.com/jaredhanson/passport) Bearer Strategy, expecting a **token**.
Send the token from POSTMAN as a header param:
_Authorization   Bearer < gotten-token >_

Type | Route | Response
------------ | ------------- | -------------
GET | http://localhost:5000/users | Should respond with all users in db
GET | http://localhost:5000/notes | Should respond with all notes in db
POST | http://localhost:5000/notes | Put note-object into body, for example: _{note:"summer times"}_ Should respond with _{"status":"OK"}_ and the note should be saved in db with the timeStamp set to current time.
POST | http://localhost:5000/notes | Should respond with _{"status":"error-message"}_.


# Using curl
## Prepare
### Add user(s)
Check if db contains users. If not create some. 
#### The easy way
curl -H "Content-Type: application/json" -X POST -d '{"username":"wojjas","password":"007"}' http://localhost:5000/users
#### The hard way
Directly to db:
db.getCollection('users').insert({"username":"wojjas", "password":"$2a$10$wtsqIsILPKCNN.kmpvr8Z.a4bEzEHYquYR.9KGb.PHYMCRYjXE1Ei"})
The password is generated using some online bcrypt generator. ("007" gave this nonsense)

## Test using curl
### Login
curl -H "Content-Type: application/json" -X POST -d '{"username":"wojjas","password":"007"}' http://localhost:5000/users/login
### Get all users 
(replace <token> with gotten as response to login)
curl -H "Authorization: Bearer <token>" -X GET http://localhost:5000/users
### Add a note (can't get this to work at the moment)
curl -H "Authorization: Bearer <token>" -X POST -d '{"note":"A note about something"}' http://localhost:5000/notes
### Get all notes