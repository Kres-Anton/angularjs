var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('./libs/mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var config=require('./config/index');
var session = require('express-session');



// configuration =================
app.set('port',config.get('port'));


app.use(express.static(__dirname + '/app'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({extended:false}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json

app.use(methodOverride());



// session =================

var sessionStore=require('./libs/sessionStore');

app.use(session({
    secret:config.get('session:secret'),
    key:config.get('session:key'),
    cookie:config.get('session:cookie'),
    store: sessionStore
}));


var recipte =require('./middleware/recipte');
var category =require('./middleware/category');

// application -------------------------------------------------------------
app.get('/', function(req, res) {
    res.render('/app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


app.get('/recipte/:id',recipte.get);
app.get('/recipte',recipte.get);
app.post('/recipte', recipte.post);


app.get('/category/:id',category.get);
app.get('/category',category.get);
app.post('/category', category.post);


app.post('/user/add', function(req, res) {
    res.json({"res":"add"});
});

app.post('/user/del', function(req, res) {
    res.json({"res":"del"});
});

app.post('/user/edit', function(req, res) {
    res.json({"res":"edit"});
});



// listen (start app with node server.js) ======================================
app.listen(app.get('port'));
console.log("App listening on port "+app.get('port'));
