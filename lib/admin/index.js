
(function() {

  function q(query) {
    return document.querySelector(query);
  }

  function qa(query) {
    return document.querySelectorAll(query);
  }

  function request(method, url) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    return xhr;
  }

  document.addEventListener('DOMContentLoaded', function(e) {
    var reset = q('[name=reset]');
    var set = q('[name=set]');
    var start = q('[name=start]');
    var pause = q('[name=pause]');
    var update = q('[name=update]');
    var track = q('[name=track]');
    var forms = [reset, set, start, pause, update, track];

    forms.forEach(function(form, index) {
      form.addEventListener('submit', function(e) {
        var xhr = request(e.target.method, e.target.action);
        xhr.send(new FormData(e.target));
        e.preventDefault();
      }, false);
    });
  }, false);

}).call(this);
