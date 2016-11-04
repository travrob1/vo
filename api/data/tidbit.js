'use strict';
var Mockgen = require('./mockgen.js');
var Mongeese = require('./mongeese.js');
var Tidbit = require('../../app/models/swagifiedApi.js').Tidbit;

/**
 * Operations on /tidbit
 */
module.exports = {
    /**
     * summary: 
     * description: Gets `Tidbit` objects.
Optional query param of **size** determines
size of returned array

     * parameters: size
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
                path: '/tidbit',
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
                path: '/tidbit',
                operation: 'get',
                response: 'default'
            }, callback);
        }
    },
    /**
     * summary: 
     * description: Create a new `tidbit`

     * parameters: tidbit
     * produces: application/json
     * responses: 200
     * operationId: 
     */
    post: {
        200: Mongeese.post(Tidbit)
    },
    /**
     * summary: 
     * description: 
     * parameters: tidbit
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
                path: '/tidbit',
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
                path: '/tidbit',
                operation: 'put',
                response: 'default'
            }, callback);
        }
    }
};
