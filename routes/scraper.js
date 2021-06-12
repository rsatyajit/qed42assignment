var express = require('express');
var router = express.Router();

let scraperController = require("../controller/Scraper.Controller");
const scraper = new scraperController();

/**
 * Making scrap from an url
 */
router.post('/', scraper.scrapeHandler);

/**
 * get all links from scrapped html 
 */
router.get('/url/get', scraper.urlHandler);

module.exports = router;
