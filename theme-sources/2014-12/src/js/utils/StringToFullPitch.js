function StringToFullPitch(str){
  var fullPitchStr = str.replace(/[A-Za-z0-9]/g,function(s){return String.fromCharCode(s.charCodeAt(0)+0xFEE0)});
  return fullPitchStr;
}

module.exports = StringToFullPitch;