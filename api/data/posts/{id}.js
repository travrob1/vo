'use strict';
var Mockgen = require('../mockgen.js');
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
     * operationId: getPostById
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/posts/{id}',
                operation: 'get',
                response: '200'
            }, callback);
        },
        default: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/posts/{id}',
                operation: 'get',
                response: 'default'
            }, callback);
        }
    }
};
