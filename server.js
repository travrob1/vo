// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 4000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var logger   = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('cookie-session');
var exphbs  = require('express-handlebars');
var _ = require('lodash');

var configDB = require('./config/database.js');



// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(logger('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: false})); // get information from html forms
app.use(bodyParser.json()); // get information from html forms

var templateDir = path.join(__dirname, 'templates/');
app.set('views', templateDir);
app.engine('handlebars', exphbs({
    defaultLayout: 'index',
    layoutsDir: templateDir,
    helpers: {
    json: function(context) {
        return JSON.stringify(context);
    }
    }
}));
app.set('view engine', 'handlebars');

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static(path.join(__dirname, '/bower_components')));
app.use(express.static(path.join(__dirname, '/node_modules')));
app.use(express.static(path.join(__dirname, '/.build')));

app.use('/swagger-ui', express.static('api/swagger-ui-2.2.6/dist'));
app.get('/config/swagger.json', function(req, res) { res.sendFile(__dirname + '/config/swagger.json'); });

var Swaggerize = require('swaggerize-express');

app.use(Swaggerize({
    api: path.resolve('./api/config/swagger.json'),
    handlers: path.resolve('./api/handlers')
}));

// routes ======================================================================
require('./app/auth-routes.js')(app, passport, _); // load our routes and pass in our app and fully configured passport
require('./app/app-routes.js')(app, _); 

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
