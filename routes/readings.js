const express = require('express');
const router = express.Router();
const readingsCtrl = require('../controllers/readings');

router.get('/new', readingsCtrl.new);
router.get('/:id', readingsCtrl.show);
router.post('/', readingsCtrl.pull);
// router.post('/:id', readingsCtrl.update);

module.exports = router;