const express = require('express');
const router = express.Router();
const colorController = require('../controllers/colorController');

router.get('/:id', colorController.readAllByProdId);

module.exports = router;