var SocketClient = require('socket.io-client');

function SocketMng(emitter){
  this.emitter = emitter;
  this.socketClient = new SocketClient();
}

SocketMng.prototype.setSocketEvents = function(){
  // emit on sockets
  this.socketClient.on('tweet',function(data){
    console.log(data);
  });
}

module.exports = SocketMng;