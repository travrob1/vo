'use strict';
var Mockgen = require('../mockgen.js');
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
     * operationId: getPetById
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/posts/{postId}',
                operation: 'get',
                response: '200'
            }, callback);
        },
        400: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/posts/{postId}',
                operation: 'get',
                response: '400'
            }, callback);
        },
        404: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/posts/{postId}',
                operation: 'get',
                response: '404'
            }, callback);
        }
    }
};
