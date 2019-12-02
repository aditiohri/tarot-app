const express = require('express');
const router = express.Router();
const readingsCtrl = require('../controllers/readings');

//get new reading form
router.get('/new', readingsCtrl.new);
//generate reading from API
router.get('/question', readingsCtrl.pull);
//show saved individual reading
router.get('/:id', readingsCtrl.show);
//show index of all readings
router.get('/', readingsCtrl.index);
//save reading in collection
router.post('/', readingsCtrl.add);
//delete individual reading
router.delete('/:id', readingsCtrl.deleteOne);
//delete all readings
router.delete('/', readingsCtrl.deleteAll);
//add reading comments
// router.post('/:id', readingsCtrl.update);

module.exports = router;