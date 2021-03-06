var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
<<<<<<< HEAD
var User = require('./models/user');
var secret = 'mysupersecretprobablyshouldbeanenvvariable';
=======
>>>>>>> 3b77f78b3a7c1787d4ef0fc0baac51a2a6df4aef
var app = express();
var User = require("./models/user");

var secret = "mysupersecretpassword";

mongoose.connect('mongodb://localhost:27017/myauthenticatedusers');

<<<<<<< HEAD
app.use(bodyParser.urlencoded({ extended: true }));
// needed to comment this out to stop accessing the users controller unconditionally
// app.use('/api/users', require('./controllers/users'));

//Middleware to check for tokens
//TO DO!
app.use('/api/users',
    expressJWT({ secret: secret }).unless({ method: 'POST' }),
    require('./controllers/users')
);

//Error handler to handle unauthorized users gracefully - otherwise it's a long and ugly response
//TO DO!
app.use(function(err, req, res, next) {
    //Catch unauthorized user errors, send status/message that is cleaner than the default
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({ message: 'You need an authorization token to view this page.' });
    }
});

//A route to generate tokens
//TO DO!
app.post('/api/auth', function(req, res) {
    //Find user, check their credentials
    //Select any information about that user that we want to include as part of the token's payload
    User.findOne({ email: req.body.email }, function(err, user) {
        //handle the error case
        if (err || !user) {
            return res.send("User not found!");
        }
        // no error and a user object was returned
        // like isValidUser function
        user.authenticated(req.body.password, function(err, result) {
            if (err || !result) {
                return res.sent('Invalid Credentials');
            }
            // no error and I got a result
            // Yay, things are woring. I'm finally ready to make a JWT!
            var token = jwt.sign(user, secret);

            //Now I have a token, I just need to send it back to the user in JSON format
            res.send({ user: user, token: token });
        });
    });
=======
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/users', require('./controllers/users'));
app.use('/api/auth', require('./controllers/auth'));

//Add middleware to look for token. Luckily express-jwt has this built-inapp.use('/api/users', expressJWT({secret: secret}).unless({method: 'POST'}));
app.use(function (err, req, res, next) {
  // send an appropriate status code & JSON object saying there was an error, if there was one.
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({message: 'You need an authorization token to view this information.'})
  }
>>>>>>> 3b77f78b3a7c1787d4ef0fc0baac51a2a6df4aef
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.listen(process.env.PORT || 3000);
