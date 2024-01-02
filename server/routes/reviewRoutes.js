const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/', reviewController.readAll);
router.post('/', reviewController.create);
router.get('/:id', reviewController.readApproved);
router.put('/:id', reviewController.updateOne);
router.delete('/:id', reviewController.deleteOne);

module.exports = router;