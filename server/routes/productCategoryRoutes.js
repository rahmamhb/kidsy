const express = require('express');
const router = express.Router();
const productCategoryController = require('../controllers/productCategoryController');

router.get('/', productCategoryController.readAll);
router.get('/:id', productCategoryController.readOne);

module.exports = router;