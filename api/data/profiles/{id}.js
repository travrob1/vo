'use strict';
var Mockgen = require('../mockgen.js');
var Mongeese = require('../mongeese.js');
var Profile = require('../../../app/models/swagifiedApi.js').Profile;
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
        200: Mongeese.getById(Profile),
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
        200: Mongeese.put(Profile),
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
