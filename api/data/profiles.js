'use strict';
var Mockgen = require('./mockgen.js');
var Mongeese = require('./mongeese.js');
var Profile = require('../../app/models/swagifiedApi.js').Profile;
var _ = require('lodash');

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
        200: Mongeese.post(Profile)
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
            if(req.user){
                var id = req.user._id;
                Profile.find({userId: id}, function(err, res){
                    if (err){
                        return callback(err);
                    } else {
                        return callback(null, {responses: res});
                    }
                });
            }
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
            if(req.user){
                var id = req.user._id;
                Profile.findOne({userId: id}, function(err, profile){
                    if (err){
                        return callback(err);
                    } else {
                        _.merge(profile, req.body);
                        profile.save(function(err, res){
                            if(err){
                                return err;
                            }else {
                            return callback(null, {responses: res});

                            }
                        });
                    }
                });
            }
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