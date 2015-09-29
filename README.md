# [socket.io](http://socket.io/)-[express-session](https://github.com/expressjs/session)

> Use express-session as socket.io middleware.

## Setup

All you have to do is adding a middleware like you would in your express app.

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

**EXAMPLE:**
An example app is available under the the `example` folder. Run the `npm run example` command to start it.

**IMPORTANT:** You must pass the same session configuration into express and socket app (the same store, same secret)!

**IMPORTANT:** Do not use the default `MemoryStore` session store. It is not designed for a production environment. If you do use the default store then you should pass the same session **instance** to express and socket app (data are saved in memory).
