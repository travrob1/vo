'use strict';
var Mockgen = require('../../../mockgen.js');
var Comment = require(dirname + '/app/models/swagifiedApi.js').Comment;
var _ = require('lodash');
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

            Comment.findOne({tidbitId: req.params.id, _id: req.params.cid},function(err, theComment){
                if (err){
                    return callback(err);
                } else {
                    return callback(null, {responses: theComment});
                }
            });
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

           Comment.findOne({tidbitId: req.params.id, _id: req.params.cid},function(err, theComment){
               if (err){
                   return callback(err);
               } else {
                   _.merge(theComment, req.body);
                   theComment.updated = new Date();
                   theComment.save(function(err, updatedComment){
                       if(err){
                           return err;
                       }else {
                            return callback(null, {responses: updatedComment});
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
                path: '/tidbits/{id}/comments/{cid}',
                operation: 'put',
                response: 'default'
            }, callback);
        }
    }
};
