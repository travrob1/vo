'use strict';
var Mockgen = require('../../../mockgen.js');
/**
 * Operations on /tidbits/{id}/comments/{cid}
 */
module.exports = {
    /**
     * summary: Find comments by ID
     * description: For administrators to view any user post
     * parameters: id, cid
     * produces: application/json
     * responses: 200, default
     * operationId: getCommentById
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/tidbits/{id}/comments/{cid}',
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
                path: '/tidbits/{id}/comments/{cid}',
                operation: 'get',
                response: 'default'
            }, callback);
        }
    },
    /**
     * summary: 
     * description: 
     * parameters: id, cid, data
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
                path: '/tidbits/{id}/comments/{cid}',
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
                path: '/tidbits/{id}/comments/{cid}',
                operation: 'put',
                response: 'default'
            }, callback);
        }
    }
};
