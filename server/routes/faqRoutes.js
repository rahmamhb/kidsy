const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

router.post('/', faqController.create );
router.get('/', faqController.readAll);
router.delete('/:id', faqController.deleteOne);

module.exports = router;