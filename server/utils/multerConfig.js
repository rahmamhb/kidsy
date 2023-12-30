const multer = require('multer');
const path = require('path');
const db = require("../db"); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,

});


module.exports = upload;