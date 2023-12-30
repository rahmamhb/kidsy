const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/', reviewController.readAll);
router.put('/:id', reviewController.updateOne);
router.delete('/:id', reviewController.deleteOne);

module.exports = router;