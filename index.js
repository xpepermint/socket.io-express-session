module.exports = function(session) {

  return function(socket, next) {
    session(socket.handshake, {}, next);
  };
};
