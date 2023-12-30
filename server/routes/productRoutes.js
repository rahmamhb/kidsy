const express = require('express');
const upload = require("../utils/multerConfig");
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', upload.array('productImages', 3) , productController.create );
router.get('/', productController.readAll);
router.get('/top6', productController.readTopSix);
router.get('/:id', productController.readOne);
router.put('/:id', productController.updateOne);
router.delete('/:id', productController.deleteOne);

module.exports = router;