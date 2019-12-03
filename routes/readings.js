const express = require('express');
const router = express.Router();
const readingsCtrl = require('../controllers/readings');

//get new reading form
router.get('/new', isLoggedIn, readingsCtrl.new);
//show saved individual reading
router.get('/:id', isLoggedIn, readingsCtrl.show);
//show index of all readings
router.get('/', readingsCtrl.index);
//generate reading from API
router.post('/question', isLoggedIn, readingsCtrl.pull);
//save reading in collection
router.post('/', isLoggedIn, readingsCtrl.add);
//edit reading interpretations
router.post('/:id/edit', isLoggedIn, readingsCtrl.edit);
//show edited reading
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