const express = require('express');
const router = express.Router();
const productCategoryController = require('../controllers/productCategoryController');

router.get('/:id', productCategoryController.readAll);
router.get('/:id/:prodid', productCategoryController.readOne);

module.exports = router;