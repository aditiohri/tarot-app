const express = require('express');
const router = express.Router();
const readingsCtrl = require('../controllers/readings');

router.get('/new', readingsCtrl.new);

module.exports = router;