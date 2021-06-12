const constants = require('../configs/constants');
const scraperService = require("../service/Scraper.Service");
let scraper = new scraperService();

class ScraperController {
    constructor() { }

    async scrapeHandler(request, response) {
        try {
            let requestedUrl = request.body.url;
            /**
             * Validating the required data
             */
            if (!requestedUrl) {
                return response.status(404).send({
                    _status: "validation error",
                    _status_code: 404,
                    _message: "url is required"
                });

            }
            /**
             * waiting for scrap handler logic to scrape all data and returns
             */
            await scraper.scrapeHandler({
                url: requestedUrl
            });
            return response.status(200).send({
                _status: "SUCCESS",
                _status_code: 200,
                _message: `Scraped into ${constants.scrapePATH} in server`
            });
        } catch (err) {
            return response.send({
                _status: "ERROR",
                _status_code: 500,
                _message: err.message
            })
        }
    }


    async urlHandler(request, response) {
        try {
            let requestedKeyword = request.query.keyword;
            /**
            * Validating the required data
            */
            if (!requestedKeyword) {
                return response.status(404).send({
                    _status: "validation error",
                    _status_code: 404,
                    _message: "keyword is required"
                });

            }
            /**
             * waiting for url handler logic to sent all mathed urls with keywords
             */
            let qedLinks = await scraper.urlHandler({
                keyword: requestedKeyword
            });
            return response.status(200).send({
                _status: "SUCCESS",
                _status_code: 200,
                _message: "Qed links fetched successfully",
                data: qedLinks
            });
        } catch (err) {
            return response.send({
                _status: "ERROR",
                _status_code: 500,
                _message: err.message
            })
        }

    }

}

module.exports = ScraperController;