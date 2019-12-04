const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

// create a comment for a reading
router.post('/readings/:id/comments', commentsCtrl.create);
router.delete('/comments/:id', commentsCtrl.delete);

module.exports = router;