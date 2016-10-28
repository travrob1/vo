'use strict';
var dataProvider = require('../../data/posts/{id}.js');
/**
 * Operations on /posts/{id}
 */
module.exports = {
    /**
     * summary: Find profile by ID
     * description: For administrators to view any user profile
     * parameters: id
     * produces: application/json
     * responses: 200, default
     */
    get: function getPostById(req, res, next) {
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
    }
};
