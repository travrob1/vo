'use strict';
var Mockgen = require('../../../mockgen.js');
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
     * operationId: getTidbitById
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/posts/{id}/tidbits/{tid}',
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
                path: '/posts/{id}/tidbits/{tid}',
                operation: 'get',
                response: 'default'
            }, callback);
        }
    },
    /**
     * summary: 
     * description: 
     * parameters: id, tid, data
     * produces: application/json
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
                path: '/posts/{id}/tidbits/{tid}',
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
                path: '/posts/{id}/tidbits/{tid}',
                operation: 'put',
                response: 'default'
            }, callback);
        }
    }
};
