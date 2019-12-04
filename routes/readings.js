const express = require('express');
const router = express.Router();
const readingsCtrl = require('../controllers/readings');

//mounted before protected routes
router.use(isLoggedIn);
//get new reading form
router.get('/new', readingsCtrl.new);
//show saved individual reading
router.get('/:id', readingsCtrl.show);
//show index of all readings
router.get('/', readingsCtrl.index);
//get form to edit readings
router.get('/:id/edit', readingsCtrl.edit);
//generate reading from API
router.post('/question', readingsCtrl.pull);
//save reading in collection
router.post('/', readingsCtrl.add);
//update reading after edit
router.put('/:id', readingsCtrl.update);
//delete individual reading
router.delete('/:id', readingsCtrl.deleteOne);
//delete all readings
router.delete('/', readingsCtrl.deleteAll);



//middleware for login
//put this anywhere in routes where only user can access
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;