const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require("../utils/multerConfig")

router.post('/', upload.single("image") , blogController.create );
router.get('/', blogController.readAll);
router.get('/:id', blogController.readOne);
router.delete('/:id', blogController.deleteOne);
router.put('/:id', blogController.updateOne);

module.exports = router;