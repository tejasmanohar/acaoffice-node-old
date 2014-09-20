// Load primary modules
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// Socket.IO setup
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.on('connection', function(){
  console.log('Websockets instantiated');
});

var port = process.env.PORT || 3000;

app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header
app.use(express.static(__dirname + '/public')); // set the static files location

require('./app/routes')(app); // configure routes

app.listen(port); // start app
server.listen(3000); // start websockets
exports = module.exports = app; // expose app