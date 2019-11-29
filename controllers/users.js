const User = require('../models/user');
const request = require('request');
const rootURL = 'https://rws-cards-api.herokuapp.com/api/v1/cards/random';

// module.exports = {
//     login
// };

// function login(req, res) {
//     console.log('req.user: ', req.user);
//     console.log('req.user.name: ', req.user.name);
//     res.render('users/index', {
//       user: req.user,
//       rootURL: rootURL
//     });
//   }
