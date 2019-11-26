var express = require('express');
var router = express.Router();
var passport = require('passport');
var request = require('request');
const rootURL = 'https://rws-cards-api.herokuapp.com/api/v1/cards/random';

// Google OAuth login route
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/users',
    failureRedirect: '/users'
  }
));

// OAuth logout route
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/users');
});

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
      user: req.user
    })
  });
});

module.exports = router;
