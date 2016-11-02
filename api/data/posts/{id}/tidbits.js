'use strict';
var Mockgen = require('../../mockgen.js');
/**
 * Operations on /posts/{id}/tidbits
 */
module.exports = {
    /**
     * summary: 
     * description: Gets `Tidbit` objects.
Optional query param of **size** determines
size of returned array

     * parameters: id, size
     * produces: application/json
     * responses: 200, default
     * operationId: 
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/posts/{id}/tidbits',
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
                path: '/posts/{id}/tidbits',
                operation: 'get',
                response: 'default'
            }, callback);
        }
    },
    /**
     * summary: 
     * description: Create a new `tidbit`

     * parameters: id, data
     * produces: application/json
     * responses: 200
     * operationId: 
     */
    post: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/posts/{id}/tidbits',
                operation: 'post',
                response: '200'
            }, callback);
        }
    }
};
