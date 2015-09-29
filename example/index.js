// initializing express-session middleware
var Session = require('express-session');
var SessionStore = require('session-file-store')(Session);
var session = Session({store: new SessionStore({path: __dirname+'/tmp/sessions'}), secret: 'pass', resave: true, saveUninitialized: true});

// creating new express app
var express = require('express');
var app = express();
app.set('views', __dirname); // template engine initialization
app.set('view engine', 'jade');
app.use(session); // session support
app.get('/login', function (req, res) { // navigate here to set a new session
  req.session.uid = Date.now();
  res.render('index', { message: "Session created: "+req.session.uid});
});
app.get('*', function (req, res) { // navigate here to see session ID
  res.render('index', {message: "Session id: "+req.session.uid});
});

// attaching express app to HTTP server
var http = require('http');
var server = http.createServer(app);
server.listen('3000'); // start listening

// creating new socket.io app
var ios = require('../');
var io = require('socket.io')(server);
io.use(ios(session)); // session support
io.on('connection', function(socket){
  socket.emit('message', "Session id: " + socket.handshake.session.uid); // this will echo session above
});
