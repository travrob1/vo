'use strict';
var Mockgen = require('../mockgen.js');
/**
 * Operations on /profiles/{id}
 */
module.exports = {
    /**
     * summary: Find profiles by ID
     * description: For administrators to view any user profile
     * parameters: id
     * produces: application/json
     * responses: 200, default
     * operationId: getProfileById
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/profiles/{id}',
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
                path: '/profiles/{id}',
                operation: 'get',
                response: 'default'
            }, callback);
        }
    },
    /**
     * summary: 
     * description: 
     * parameters: id, data
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
                path: '/profiles/{id}',
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
                path: '/profiles/{id}',
                operation: 'put',
                response: 'default'
            }, callback);
        }
    }
};
