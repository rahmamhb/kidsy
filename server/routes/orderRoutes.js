const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.readAll);
router.post('/', orderController.create);
router.get('/:id', orderController.readOne);
router.get('/order-products/:id', orderController.readOneProds);
router.put('/:id', orderController.updateOne);
router.delete('/:id', orderController.deleteOne);

module.exports = router;