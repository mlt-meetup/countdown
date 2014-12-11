var $ = require('jquery');
var fullPitchString = require('../utils/StringToFullPitch');
var getRandomInt = require('../utils/getRandomInt');

function View(emitter){
  this.emitter = emitter;
  this.$ = $;

  //sec
  this.speakTime = 600;

  this.emitter.on('set', this.set.bind(this));
  this.emitter.on('reset', this.reset.bind(this));
  this.emitter.on('start', this.start.bind(this));
  this.emitter.on('pause', this.pause.bind(this));
  this.emitter.on('update', this.update.bind(this));
  this.emitter.on('track', this.track.bind(this));
  this.emitter.on('tweet', this.tweet.bind(this));

};

View.prototype.insertAudience = function(){
  for (var i = 0; i <= 20; i++) {
    var type = "type" + getRandomInt(0,4); 
    var $dom = this.$('<div class="audience pos_'+i+' '+ type +'"><img src="images/man.png" alt=""></div>');
    this.$('.audience_wrap').append($dom);
  }
};

View.prototype.setEmitterEvents = function(){
  //recieve event from socketMng
};

View.prototype.update = function(speakerName, speakerTitle){
  this.$('.lt_speaker__name').text(fullPitchString(speakerName) + "亭");
  this.$('#speaker_title').text(speakerTitle);
};


View.prototype.reset = function(){

};

View.prototype.set = function(sec){
  console.log(sec);
  this.speakTime = sec;
};

View.prototype.start = function(sec){
  console.log('start!!!');
  this.speakTime = sec;

  // first position = 52%
  var basePos = 0;
  this.$('#close_left').css({left: -basePos'%'});
  this.$('#close_right').css({right: -basePos'%'});
};

View.prototype.tick = function(until){
  var per = this.speakTime / until;
  this.$('#close_left').css({left:-per + '%'});
  this.$('#close_right').css({right:-per + '%'});
};

View.prototype.tweet = function(tweet){
  console.log(tweet);
};

View.prototype.track = function(){
  //検索キーワードがでてきたとき,,,
};

View.prototype.pause = function(){

};


module.exports = View;