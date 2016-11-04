'use strict';
var Mockgen = require('./mockgen.js');
var Mongeese = require('./mongeese.js');
var Post = require('../../app/models/swagifiedApi.js').Post;
/**
 * Operations on /posts
 */
module.exports = {
    /**
     * summary: 
     * description: Gets `Post` objects.
Optional query param of **size** determines
size of returned array

     * parameters: size
     * produces: application/json
     * responses: 200, default
     * operationId: 
     */
    get: {
        200: Mongeese.get(Post),
        default: function (req, res, callback) {
            console.log('posts default');
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/posts',
                operation: 'get',
                response: 'default'
            }, callback);
        }
    },
    /**
     * summary: 
     * description: Create a new `tidbit`

     * parameters: data
     * produces: application/json
     * responses: 200
     * operationId: 
     */
    post: {
        200: Mongeese.post(Post)
    }
};
