var express = require('express');
var router = express.Router();
var request = require('request');
const rootURL = 'https://rws-cards-api.herokuapp.com/api/v1/cards';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
