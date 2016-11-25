'use strict';
var Mockgen = require('../../../mockgen.js');
var Tidbit = require(dirname + '/app/models/swagifiedApi.js').Tidbit;
var _ = require('lodash');

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
           Tidbit.findOne({postId: req.params.id, _id: req.params.tid},function(err, theTidbit){
               if (err){
                   return callback(err);
               } else {
                   return callback(null, {responses: theTidbit});
               }
           });
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
           Tidbit.findOne({postId: req.params.id, _id: req.params.tid},function(err, theTidbit){
               if (err){
                   return callback(err);
               } else {
                   _.merge(theTidbit, req.body);
                   theTidbit.updated = new Date();
                   theTidbit.save(function(err, updatedTidbit){
                       if(err){
                           return err;
                       }else {
                            return callback(null, {responses: updatedTidbit});
                       }
                   });
               }
           });
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
