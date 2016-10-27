'use strict';
var Mockgen = require('./mockgen.js');
var Profile = require('../../app/models/swagified.js').Profile;
/**
 * Operations on /profile
 */
module.exports = {
    /**
     * summary: 
     * description: Gets `Profile` objects.
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
     * description: Create a new `profile`

     * parameters: profile
     * produces: 
     * responses: 200
     * operationId: 
     */
    post: {
        200: function (req, res, callback) {
            var newProfile = new Profile(req.body);
            newProfile.save(function(err) {
                if (err)
                    throw err;
                return callback(null, {responses: newProfile});
            });
        }
    },
    /**
     * summary: 
     * description: 
     * parameters: profile
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
            function fakeCallback(a, b, c) {
                var r = callback(a, b, c);
                console.log('params', r, a, b, c);
            }
            Mockgen().responses({
                path: '/profile',
                operation: 'put',
                response: '200'
            }, fakeCallback);
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
