
var Emitter = require('component-emitter');

module.exports = Countdown;

function Countdown(sec) {
  this.raf;
  this.startedAt;
  this.finishedAt;
  this.diff;
  this.remain = sec;
}

Emitter(Countdown.prototype);

Countdown.prototype.start = function() {
  this.startedAt = new Date();
  this.finishedAt = new Date(this.startedAt.valueOf() + (this.remain * 1000));
  this.raf = requestAnimationFrame(this.tick.bind(this));
};

Countdown.prototype.pause = function() {
  cancelAnimationFrame(this.raf);
};

Countdown.prototype.tick = function() {
  var now = new Date();
  var diff = (this.finishedAt - now) / 1000 | 0;
  if (diff != this.diff) this.emit('tick', diff);
  this.diff = diff;
  if (this.diff <= 0) return this.emit('finish');
  requestAnimationFrame(this.tick.bind(this));
};
