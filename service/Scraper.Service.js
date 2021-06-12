const constants = require('../configs/constants');
const rp = require('request-promise');
const fs = require('fs');
const Cheerio = require('cheerio');

class ScraperService {
    constructor() { }

    scrapeHandler(configs) {
        return new Promise(async (resolve, reject) => {
            try {
                let requestedUrl = configs.url;
                /** with request 
                 * scarped all the html from url and stored it in server (in a HTML file)
                 */
                let html = await rp(requestedUrl);
                fs.writeFile(constants.scrapePATH, html, function (err) {
                    (err) ? reject(err) : resolve();
                });
            } catch (err) {
                (err) ? reject(err) : resolve();
            }

        })
    }


    urlHandler(configs) {
        return new Promise(async (resolve, reject) => {
            try {
                /**
                 * Picked up that content from HTML file that is already been scraped in server
                 */
                let html = fs.readFileSync(constants.scrapePATH).toString();
                if (!html) {
                    reject({
                        "message": "Please do the Scraping first."
                    })
                } else {
                    let qedLinks = [];
                    /**
                     * Loaded all html content as JSON object via cheerio
                     */
                    let $ = Cheerio.load(html);
                    /**
                     * Looped through all attributes that have anchor tag or links
                     */
                    $('a').each(function () {
                        var link = $(this).attr('href');
                        /**
                         * Matched with the keywords that is passed
                         */
                        if (link && link.includes(configs.keyword)) {
                            let fullLink = `${constants.baseUrl}${link}`;
                            /**
                             * There may be multiple url can be found with searched keyword , 
                             * hence taken an array and pushed all links
                             */
                            if (qedLinks.indexOf(fullLink) == -1) {
                                qedLinks.push(fullLink);
                            }
                        };
                    });
                    resolve(qedLinks);
                }

            } catch (err) {
                (err) ? reject(err) : resolve([]);
            }

        })
    }


}

module.exports = ScraperService;