
/**
 * Module dependencies.
 */

var express = require('express');
var router = module.exports = express.Router();
var source = require('fs').readFileSync(__dirname + '/../lib/admin/index.js');

router.get('/', function(req, res) {
  res.render('admin/index', { title: 'express' });
});

router.get('/app.js', function(req, res) {
  res.type('js');
  res.send(source);
});

router.post('/reset', function(req, res) {
  req.app.emit('reset');
  res.send({ reset: true });
});

router.post('/set', function(req, res) {
  var sec = req.body.sec;
  req.app.emit('set', Number(sec));
  res.send({ sec: sec });
});

router.post('/start', function(req, res) {
  req.app.emit('start');
  res.send({ start: true });
});

router.post('/pause', function(req, res) {
  req.app.emit('pause');
  res.send({ pause: true });
});

router.post('/update', function(req, res) {
  var name = req.body.name;
  var title = req.body.title;
  req.app.emit('update', name, title);
  res.send({ name: name, title: title });
});

router.post('/track', function(req, res) {
  var query = req.body.query;
  req.app.emit('track', query);
  res.send({ track: query });
});
