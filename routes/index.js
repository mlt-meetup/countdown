var express = require('express');
var router = express.Router();
var admin = require('./admin');

router.use('/admin', admin);

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
