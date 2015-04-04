# [socket.io](http://socket.io/)-[express-session](https://github.com/expressjs/session)

> Use express-session as socket.io middleware.

## Setup

All you have to is adding a middleware like you would in your express app.

```js
var ios = require('socket.io-express-session');
var session = ... configured express-session instance
...

io.use(ios(session));
...
io.on('connection', function(socket){
  console.log(socket.handshake.session);
});
```

## Example

```js
// initializing express-session middleware
var Session = require('express-session'),
    SessionStore = require('session-file-store')(Session);
var session = Session({ secret: 'pass', resave: true, saveUninitialized: true });

// creating new express app
var express = require('express');
var app = express();
app.use(session); // session support
app.get('/', function (req, res) {
  req.session.uid = 1;
  res.send('Hi user #' + req.session.uid);
});

// attaching express app to HTTP server
var http = require('http');
var server = http.createServer(app);
server.listen(process.env.PORT || '3000');

// creating new socket.io app
var ios = require('socket.io-express-session');
var io = require('socket.io')(server);
io.use(ios(session)); // session support
io.on('connection', function(socket){
  console.log(socket.handshake.session);
});
```

**NOTE**: You should change the default MemoryStore session store. It is not designed for a production environment. If you do use the default store then you should pass the same session instance to express and io app (data are saved in memory).
