const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/',  function (req, res) {
  res.render('users/index', {
    user: req.user,
    title: 'Tarot Reading'
  });
})

// Google OAuth login route
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/error'
  }
));

// OAuth logout route
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});



module.exports = router;
