/*global require, module */
var Mockgen = require('../mockgen.js');
var Mongeese = require('../mongeese.js');
var Post = require('../../../app/models/swagifiedApi.js').Post;
/**
 * Operations on /posts/{id}
 */
module.exports = {
    /**
     * summary: Find posts by ID
     * description: For administrators to view any user post
     * parameters: id
     * produces: application/json
     * responses: 200, default
     * operationId: getPostById
     */
    get: {
        200: Mongeese.getById(Post),
        default: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/posts/{id}',
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
        200: Mongeese.put(Post),
        default: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/posts/{id}',
                operation: 'put',
                response: 'default'
            }, callback);
        }
    }
};
