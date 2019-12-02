const express = require('express');
const router = express.Router();
const readingsCtrl = require('../controllers/readings');

//get new reading form
router.get('/new', readingsCtrl.new);
//show saved individual reading
router.get('/:id', readingsCtrl.show);
//show index of all readings
router.get('/', isLoggedIn, readingsCtrl.index);
//generate reading from API
router.post('/question', readingsCtrl.pull);
//save reading in collection
router.post('/', readingsCtrl.add);
//delete individual reading
router.delete('/:id', readingsCtrl.deleteOne);
//delete all readings
router.delete('/', readingsCtrl.deleteAll);
//add reading comments
// router.post('/:id', readingsCtrl.update);


//middleware for login
//put this anywhere in routes where only user can access
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;