var express = require('express');
var router = express.Router();
var request = require('request');
const rootURL = 'https://rws-cards-api.herokuapp.com/api/v1/cards/random';

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res) {
  console.log('hi');
  request(rootURL, function (err, response, body) {
    // const cards = JSON.parse(body);
    // console.log('cards: ', cards);
    console.log('body: ', body);
    console.log('err: ', err);
    res.render('index', {
      title: 'Tarot Reading',
      cards: body,
    })
  });
});

module.exports = router;
