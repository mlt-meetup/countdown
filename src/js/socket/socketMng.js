var Socket_client = require('socket.io-client');

function SocketMng(emitter){
  this.emitter = emitter;
  this.socket_client = new Socket_client();
}

SocketMng.prototype.setSocketEvents = function(){
  // emit on sockets
  this.socket_client.on('',function(){

  });
}

module.exports = SocketMng;