'use strict';
var dataProvider = require('../../data/posts/{postId}.js');
/**
 * Operations on /posts/{postId}
 */
module.exports = {
    /**
     * summary: Find profile by ID
     * description: For administrators to view any user profile
     * parameters: postId
     * produces: application/json
     * responses: 200, 400, 404
     */
    get: function getPetById(req, res, next) {
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
