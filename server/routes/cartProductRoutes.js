const express = require('express');
const router = express.Router();
const cartProductController = require('../controllers/cartProductController');


router.get('/:id', cartProductController.readAll);
router.post('/', cartProductController.create);
router.delete('/:id/:prodid', cartProductController.deleteOne);
router.put('/:id/:prodid', cartProductController.updateOne);

module.exports = router;