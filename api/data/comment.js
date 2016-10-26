'use strict';
var Mockgen = require('./mockgen.js');
/**
 * Operations on /comment
 */
module.exports = {
    /**
     * summary: 
     * description: Gets `Comment` objects.
Optional query param of **size** determines
size of returned array

     * parameters: size
     * produces: 
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
                path: '/comment',
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
                path: '/comment',
                operation: 'get',
                response: 'default'
            }, callback);
        }
    },
    /**
     * summary: 
     * description: Create a new `comment`

     * parameters: comment
     * produces: 
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
                path: '/comment',
                operation: 'post',
                response: '200'
            }, callback);
        }
    },
    /**
     * summary: 
     * description: 
     * parameters: comment
     * produces: 
     * responses: 200, default
     * operationId: 
     */
    put: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/comment',
                operation: 'put',
                response: '200'
            }, callback);
        },
        default: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/comment',
                operation: 'put',
                response: 'default'
            }, callback);
        }
    }
};
