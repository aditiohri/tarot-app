const User = require('../models/user');

module.exports = {
    index
};

function index(req, res, next) {
    // let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    // let sortKey = req.query.sort || 'name';
    // User.find(modelQuery).sort(sortKey).exec(function(err, users) {
    //     if (err) return next (err);
        res.render('users/index',  {
            user: req.user,
            name: req.query.name,
        });
    // })
}

// router.get('/', function(req, res) {
//   console.log('hi');
//   request(rootURL, function (err, response, body) {
//     console.log('body: ', body);
//     console.log('err: ', err);
//     res.render('index', {
//       title: 'Tarot Reading',
//       cards: body,
//       user: req.user
//     })
//   });
// });