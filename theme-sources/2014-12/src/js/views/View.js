var $ = require('jquery');
var fullPitchString = require('../utils/StringToFullPitch');
var getRandomInt = require('../utils/getRandomInt');

function View(emitter){
  this.emitter = emitter;
  this.$ = $;

  //animation dom
  this.$msgBase = $('<div class="msg"></div>').on('animationend webkitAnimationEnd', this.msgAnimSeq.bind(this));

  //this query
  this.query = "";

  //sec
  this.speakTime = 600;

  this.base_postions = [
    

  ];

  //msg base width == 200
  this.msgHorizonalNum = Math.round(this.$(window).width() / 200);
  this.msgCnt = 0;

  this.emitter.on('set', this.set.bind(this));
  this.emitter.on('reset', this.reset.bind(this));
  this.emitter.on('start', this.start.bind(this));
  this.emitter.on('pause', this.pause.bind(this));
  this.emitter.on('update', this.update.bind(this));
  this.emitter.on('track', this.track.bind(this));
  this.emitter.on('tweet', this.tweet.bind(this));

  this.$(window).on('resize', this.onResizeView.bind(this) );

};

View.prototype.onResizeView = function () {
  //all msg remove...
  this.$('.msg').each(function(index, el) {
    $(this).fadeOut(300,function(){
      $(this).remove();
    })
  });

  this.msgHorizonalNum = Math.round(this.$(window).width() / 200);
}

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
  console.log('reset function');
  this.update('提供 いいオフィスさん', '月刊LT12月号の巻');
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
  this.$('#close_left').css({left: -basePos+'%'});
  this.$('#close_right').css({right: -basePos+'%'});
};

View.prototype.tick = function(until){
  var per = this.speakTime / until;
  this.$('#close_left').css({left:-per + '%'});
  this.$('#close_right').css({right:-per + '%'});
};

View.prototype.tweet = function(tweet){
  console.log(tweet);
  var msg = this.$msgBase.clone(true,true);
  var text = tweet.text;
  // todo ある程度は.. に置き換え

  //text set
  var p = $('<p>"'+text+'"</p>')
  msg.append(p);

  //img
  var img = $('<div class="image"><img src="'+tweet.user.profile_image_url+'"></div>');
  msg.append(img);


  //position calc
  this.msgCnt++;
  var r = getRandomInt(0, this.msgHorizonalNum - 1);
  // var r = this.msgCnt % this.msgHorizonalNum;
  var leftPos = this.$(window).width() / this.msgHorizonalNum * r;
  var bottomPos = this.$(window).height() * 0.2;
  leftPos += getRandomInt(0,20);
  bottomPos += getRandomInt(0,Math.round( this.$(window).height() * 0.2 ) );
  
  //out side...
  if (leftPos + 220 > this.$(window).width()) {
    leftPos = this.$(window).width() - 240;
  };

  if (leftPos < this.$(window).width()/2 ){
    msg.addClass('leftside');
  }else{
    msg.addClass('rightside');
  }

  //css set
  msg.css({
    left: leftPos,
    bottom: bottomPos
  });

  //animation set
  msg.addClass('arrival')

  this.$('body').append(msg);

};

View.prototype.track = function(query){
  //検索キーワードが設定,,,
  console.log(query);
  this.query = query;
};

View.prototype.pause = function(){

};

View.prototype.msgAnimSeq = function(e){

  switch(e.originalEvent.animationName){
    case 'arrival':
      this.$(e.target).addClass('state');
      break;
    case 'state':
      this.$(e.target).addClass('depart')
      break;
    case 'depart':
      this.$(e.target).remove();
      break;
  }
};


module.exports = View;