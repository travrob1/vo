'use strict';
var Mockgen = require('./mockgen.js');
/**
 * Operations on /profile
 */
module.exports = {
    /**
     * summary: 
     * description: Create a new `profile`

     * parameters: profile
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
                path: '/profile',
                operation: 'post',
                response: '200'
            }, callback);
        }
    },
    /**
     * summary: Find profiles by ID
     * description: Get a profile by userId
     * parameters: 
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
                path: '/profile',
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
                path: '/profile',
                operation: 'get',
                response: 'default'
            }, callback);
        }
    },
    /**
     * summary: 
     * description: 
     * parameters: data
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
                path: '/profile',
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
                path: '/profile',
                operation: 'put',
                response: 'default'
            }, callback);
        }
    }
};
