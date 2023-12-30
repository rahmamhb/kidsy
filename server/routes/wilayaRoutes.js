const express = require('express');
const router = express.Router();
const wilayaController = require('../controllers/wilayaController');

router.get('/', wilayaController.readAll);

module.exports = router;