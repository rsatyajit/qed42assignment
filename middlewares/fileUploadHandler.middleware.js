const multer = require('multer');
const path = require("path");
const maxSize = 2000000;
/**
 *  file uploader  
 */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype != 'application/vnd.ms-excel') {
            return cb(new Error('WRONG_FILE_TYPE'))
        }
        cb(null, 'uploader/')
    },
    filename: function (req, file, cb) {
        file.uniqueName = Date.now().toString();
        cb(null, file.uniqueName + path.extname(file.originalname))
    }
})
module.exports = multer({ storage: storage, limits: { fileSize: maxSize } });