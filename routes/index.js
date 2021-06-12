var express = require('express');
var router = express.Router();

const scraper = require("./scraper");
const employee = require("./employee");

const constants = require('../configs/constants');

/**
 * BASE ROUTER
 */
router.get('/', (req, res) => { res.send("SERVER IS ONLINE") });
/**
 * Main router 
 */
router.use(`${constants.apiUrl}scrape`, scraper);
router.use(`${constants.apiUrl}employee`, employee);

module.exports = router;
