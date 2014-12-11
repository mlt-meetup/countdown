var $ = require('jquery');
var fullPitchString = require('../utils/StringToFullPitch');
var getRandomInt = require('../utils/getRandomInt');

function View(emitter){
  this.emitter = emitter;
  this.$ = $;

  //sec
  this.speakTime = 600;

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
  this.emitter.on('set', this.set.bind(this));
  this.emitter.on('reset', this.reset.bind(this));
  this.emitter.on('start', this.start.bind(this));
  this.emitter.on('pause', this.pause.bind(this));
  this.emitter.on('update', this.update.bind(this));
  this.emitter.on('track', this.track.bind(this));
  this.emitter.on('tweet', this.tweet.bind(this));
};

View.prototype.update = function(speakerName, speakerTitle){
  this.$('.lt_speaker__name').text(fullPitchString(speakerName));
  this.$('#speaker_title').text(speakerTitle + "亭");
};


View.prototype.reset = function(){

};

View.prototype.set = function(sec){
  this.speakTime = sec;
};

View.prototype.start = function(sec){
  this.speakTime = sec;
};

View.prototype.tick = function(until){

};

View.prototype.tweet = function(){

}



module.exports = View;