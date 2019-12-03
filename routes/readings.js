const express = require('express');
const router = express.Router();
const readingsCtrl = require('../controllers/readings');

//get new reading form
router.get('/new', isLoggedIn, readingsCtrl.new);
//show saved individual reading
router.get('/:id', isLoggedIn, readingsCtrl.show);
//show index of all readings
router.get('/', isLoggedIn, readingsCtrl.index);
//get form to edit readings
router.get('/:id/edit', isLoggedIn, readingsCtrl.edit);
//generate reading from API
router.post('/question', readingsCtrl.pull);
//save reading in collection
router.post('/', isLoggedIn, readingsCtrl.add);
//update reading after edit
router.put('/:id', isLoggedIn, readingsCtrl.update);
//delete individual reading
router.delete('/:id', isLoggedIn, readingsCtrl.deleteOne);
//delete all readings
router.delete('/', isLoggedIn, readingsCtrl.deleteAll);



//middleware for login
//put this anywhere in routes where only user can access
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;