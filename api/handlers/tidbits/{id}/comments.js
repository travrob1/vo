'use strict';
var dataProvider = require('../../../data/tidbits/{id}/comments.js');
/**
 * Operations on /tidbits/{id}/comments
 */
module.exports = {
    /**
     * summary: 
     * description: Gets `Comment` objects.
Optional query param of **size** determines
size of returned array

     * parameters: id, size
     * produces: application/json
     * responses: 200, default
     */
    get: function (req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['get']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    },
    /**
     * summary: 
     * description: Create a new `comment`

     * parameters: id, data
     * produces: application/json
     * responses: 200
     */
    post: function (req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['post']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
