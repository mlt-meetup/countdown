
var io = require('socket.io-client');

module.exports = SocketMng;

function SocketMng(emitter){
  this.emitter = emitter;
  this.socket = io(location.hostname + ':3000');
  this.tweets = [];

  this.socket.on('set', this.onset.bind(this));
  this.socket.on('reset', this.onreset.bind(this));
  this.socket.on('start', this.onstart.bind(this));
  this.socket.on('pause', this.onpause.bind(this));
  this.socket.on('update', this.onupdate.bind(this));
  this.socket.on('track', this.ontrack.bind(this));
  this.socket.on('tweet', this.ontweet.bind(this));
}

SocketMng.prototype.onset = function(sec) {
  console.log('onset');
  this.emitter.emit('set', sec);
};

SocketMng.prototype.onreset = function() {
  console.log('onreset');
  this.emitter.emit('reset');
};

SocketMng.prototype.onstart = function() {
  console.log('onstart');
  this.emitter.emit('start');
};

SocketMng.prototype.onpause = function() {
  this.emitter.emit('pause');
};

SocketMng.prototype.ontrack = function(query) {
  console.log('ontrack');
  this.emitter.emit('track', query);
};

SocketMng.prototype.onupdate = function(name, title) {
  console.log('onupdate');
  this.emitter.emit('update', name, title);
};

SocketMng.prototype.ontweet = function(tweet) {
  console.log('ontweet');
  this.tweets.push(tweet);
  this.emitter.emit('tweet', tweet);
};
