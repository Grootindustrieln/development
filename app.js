// definitions and loading of middleware
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');
var multer = require('multer');
var upload = multer();
var validator = require('express-validator');
var app = express();

var routes = require('./routes/index');
var users = require('./routes/users');

// establish connection to postgres
const pool = require('./config/database');

/////////////////////////////////////
// middleware for company information
/////////////////////////////////////
app.use(function (req, res, next) {
    var company = {
        id: 12,
        name: 'Acme Industries',
        city: 'Cleveland',
        state: 'Ohio'
      };
    req.company = company;
    next();
});

//////////////////////////////////
// middleware for plan information
//////////////////////////////////
app.use(function (req, res, next) {
    var plan = {
        id: 3,
        name: 'Bronze',
        cycle: 'Free'
      };
    req.plan = plan;
    next();
});

require('./models/user');

// middleware for express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// parsing middleware for forms and inputs
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'})); // for parsing application/json
app.use(validator());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); // for parsing application/x-www-form-urlencoded
app.use(upload.array()); // for parsing multipart/form-data
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', routes);
app.use('/users', users);

// middleware for express-validator
app.use(validator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(express.static(path.join(__dirname + '/routes')));
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/views')));
app.use(express.static(path.join(__dirname + '/models')));
app.use(express.static(path.join(__dirname + '/config')));



// set the view engine to ejs
app.set('view engine', 'ejs');


app.listen(process.env.PORT, function() { console.log('And now the magic begins...')});