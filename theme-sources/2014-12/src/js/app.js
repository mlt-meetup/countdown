var $ = require("jquery");
var Emitter = require("component-emitter");
var View = require("./views/view");
var SocketMng = require("./socket/socketMng.js");
var Countdown = require('./utils/countdown');

$(function(){

  //emitter
  var emitter = new Emitter();
  var socektMng = window.socketMng = new SocketMng(emitter);
  var view = window.view = new View(emitter);

  view.insertAudience();

  // var countdown = new Countdown(10);

  // countdown.on('tick', function(sec) {
  //   console.log('tick', sec);
  // });

  // countdown.on('finish', function() {
  //   console.log('finish');
  // });

  // countdown.start();
});