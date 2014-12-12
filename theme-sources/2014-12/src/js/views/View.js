var $ = require('jquery');
var fullPitchString = require('../utils/StringToFullPitch');
var getRandomInt = require('../utils/getRandomInt');
var Countdown = require('../utils/countdown');
function View(emitter){
  this.emitter = emitter;
  this.$ = $;

  //animation dom
  this.$msgBase = $('<div class="msg"></div>').on('animationend webkitAnimationEnd', this.msgAnimSeq.bind(this));
  this.$pandaBase = $('<div class="panda_comment"></div>').on('animationend webkitAnimationEnd', this.pandaAnimSeq.bind(this));


  //this query
  this.query = "#mlt2014";

  //sec
  this.speakTime = 10;

  //count down
  this.countdown = null;

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

  //pandacomment loop
  setInterval(this.addPandaComment.bind(this), 8000);

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

  Ts.reload();
};


View.prototype.reset = function(){
  console.log('reset function');
  this.update('提供 いいオフィスさん', '月刊LT12月号の巻');
  
  this.$('.lt_speaker__name').text('提供 いいオフィスさん ＠ＬＩＧ');
  this.$('#speaker_title').text('月刊LT12月号の巻');

  //syuryo
  this.$('.syuryo').addClass('hidden');

  //maku
  var basePos = 52;
  this.$('#close_left').css({left: -basePos+'%'});
  this.$('#close_right').css({right: -basePos+'%'});

  this.$('#until').text('');

  //count down stop
  this.pause();

};

View.prototype.set = function(sec){
  console.log(sec);
  this.speakTime = sec;
};

View.prototype.start = function(){
  console.log('start!!!',this.speakTime);
  // first position = 52%
  var basePos = 100;
  this.$('#close_left').css({left: -basePos+'%'});
  this.$('#close_right').css({right: -basePos+'%'});

  this.$('.syuryo').addClass('hidden');

  if (this.countdown != null) {
    this.countdown.pause();
    this.countdown = null;
  }else{

  }

  //new countdown
  this.countdown = new Countdown(this.speakTime);
  this.countdown.on('tick', this.tick.bind(this));
  this.countdown.on('finish', this.finish.bind(this));
  this.countdown.start();
};

View.prototype.finish = function(){
  this.countdown.pause();
  this.$('.syuryo').removeClass('hidden');
  this.$('#until').text('');
}

View.prototype.tick = function(until){
  var per =  (until / this.speakTime) * 52;
  console.log(per,until);
  this.$('#close_left').css({left:-per + '%'});
  this.$('#close_right').css({right:-per + '%'});
  this.$('#until').text(until + '秒');
};

View.prototype.tweet = function(tweet){
  // console.log(tweet);
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
  this.query = query;
};

View.prototype.pause = function(){
  console.log('pause!!!!!!!!!!');
  if (this.countdown != null) {
    this.countdown.pause();
    this.countdown = null;
  };
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


View.prototype.addPandaComment = function(e){
  console.log('add panda comment');
  var msg = this.$pandaBase.clone(true,true);

  var text = this.getPandaText();
  msg.text(text);

  msg.addClass('panda_arrival');
  this.$('#speaker_body').after(msg);
};

View.prototype.getPandaText = function(){
  var _case = getRandomInt(0,12);
  var text;
  switch(_case){
    case 0:
      text = '笹が食べたい。';
      break;
    case 1:
      text = 'いまは「'+this.query +'」でTweetを集めてるよ。';
      break;
    case 2:
      text = '御社 & 弊社';
      break;
    case 3:
      text = 'ふむふむ';
      break;
    case 4:
      text = '話すのは緊張するなぁ';
      break;
    case 5:
      text = 'LIGさま、いいオフィスさまお貸し頂きありがなしゃす！';
      break;
    case 6:
      text = 'Tweetたくさんしてちょ〜';
      break;
    case 7:
      text = '今年も色々ありましたなぁ。';
      break;
    case 8:
      text = 'お越しいただきありがとうございます';
      break;
    case 9:
      text = '飲まなきゃやってらんねーよ！！！';
      break;
    case 10:
      text = 'ありがとうございます。';
      break;
    case 11:
      text = '#mlt2014でつぶやいてださい';
      break;
    case 12:
      text = '#mlt2014でつぶやきしようよ！';
      break;
  }

  return text;
}

View.prototype.pandaAnimSeq = function(e){

  switch(e.originalEvent.animationName){
    case 'panda_arrival':
      this.$(e.target).addClass('panda_state');
      break;
    case 'panda_state':
      this.$(e.target).addClass('panda_depart')
      break;
    case 'panda_depart':
      this.$(e.target).remove();
      break;
  }
};

module.exports = View;