var express = require('express');
var router = express.Router();
const uploadMiddleware = require("../middlewares/fileUploadHandler.middleware");

let employeeController = require("../controller/Employee.Controller");
const employee = new employeeController();

/**
 * import CSV file with details to insert in DB
 * file type : CSV (restricted)
 */
router.post('/', uploadMiddleware.single('file'), employee.importHandler);

module.exports = router;
