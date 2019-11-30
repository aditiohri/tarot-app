const express = require('express');
const router = express.Router();
const readingsCtrl = require('../controllers/readings');

router.get('/new', readingsCtrl.new);
router.post('/', readingsCtrl.pull);
// router.put('/:id', readingsCtr.update);

module.exports = router;