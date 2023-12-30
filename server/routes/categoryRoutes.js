const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/', categoryController.create);
router.get('/', categoryController.readAll);
router.get('/:id', categoryController.readOne);

module.exports = router;