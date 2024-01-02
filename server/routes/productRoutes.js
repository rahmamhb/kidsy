const express = require('express');
const upload = require("../utils/multerConfig");
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', upload.single("image") , productController.create );
router.get('/', productController.readAll);
router.get('/top6', productController.readTopSix);
router.get('/:id', productController.readOne);
router.delete('/:id', productController.deleteOne);

module.exports = router;