'use strict';
var Mockgen = require('../../mockgen.js');
var Tidbit = require(dirname + '/app/models/swagifiedApi.js').Tidbit;
/**
 * Operations on /posts/{id}/tidbits
 */
module.exports = {
    /**
     * summary: 
     * description: Gets `Tidbit` objects.
Optional query param of **size** determines
size of returned array

     * parameters: id, size
     * produces: application/json
     * responses: 200, default
     * operationId: 
     */
    get: {
        200: function (req, res, callback) {
            req.body.postId = req.params.id;

            Tidbit.find({postId: req.body.postId},function(err, res){
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
                path: '/posts/{id}/tidbits',
                operation: 'get',
                response: 'default'
            }, callback);
        }
    },
    /**
     * summary: 
     * description: Create a new `tidbit`

     * parameters: id, data
     * produces: application/json
     * responses: 200
     * operationId: 
     */
    post: {
        200: function (req, res, callback) {
            req.body.postId = req.params.id;
            var instance = new Tidbit(req.body);
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
