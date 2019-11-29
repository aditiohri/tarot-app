var express = require('express');
var router = express.Router();
var passport = require('passport');

// Google OAuth login route
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/users',
    failureRedirect: '/'
  }
));

// OAuth logout route
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Tarot Reading',
    user: req.user
  });
});

router.get('/users', function (req, res) {
  console.log('req.user: ', req.user);
  console.log('req.user.name: ', req.user.name);
  res.render('users/index', {
    user: req.user,
  });
})


module.exports = router;
