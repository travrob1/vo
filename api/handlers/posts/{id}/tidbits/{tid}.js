'use strict';
var dataProvider = require('../../../../data/posts/{id}/tidbits/{tid}.js');
/**
 * Operations on /posts/{id}/tidbits/{tid}
 */
module.exports = {
    /**
     * summary: Find tidbits by ID
     * description: For administrators to view any user post
     * parameters: id, tid
     * produces: application/json
     * responses: 200, default
     */
    get: function getTidbitById(req, res, next) {
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
     * description: 
     * parameters: id, tid, data
     * produces: application/json
     * responses: 200, default
     */
    put: function (req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['put']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
