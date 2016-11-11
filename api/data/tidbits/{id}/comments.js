'use strict';
var Mockgen = require('../../mockgen.js');
var Comment = require(dirname + '/app/models/swagifiedApi.js').Comment;

/**
 * Operations on /tidbits/{id}/comments
 */
module.exports = {
    /**
     * summary: 
     * description: Gets `Comment` objects.
Optional query param of **size** determines
size of returned array

     * parameters: id, size
     * produces: application/json
     * responses: 200, default
     * operationId: 
     */
    get: {
        200: function (req, res, callback) {

          Comment.find({tidbitId: req.params.id},function(err, res){
              if (err){
                  return callback(err);
              } else {
                  return callback(null, {responses: res});
              }
          });
        },
        default: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/tidbits/{id}/comments',
                operation: 'get',
                response: 'default'
            }, callback);
        }
    },
    /**
     * summary: 
     * description: Create a new `comment`

     * parameters: id, data
     * produces: application/json
     * responses: 200
     * operationId: 
     */
    post: {
        200: function (req, res, callback) {
           req.body.tidbitId = req.params.id;
           var instance = new Comment(req.body);
           instance.save(function(err) {
               if (err) {
                   return callback(err);
               } else {
                   return callback(null, {responses: instance});
               }
           });
        }
    }
};
