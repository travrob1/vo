'use strict';
var Mockgen = require('./mockgen.js');
var Mongeese = require('./mongeese.js');
var Profile = require('../../app/models/swagifiedApi.js').Profile;
/**
 * Operations on /profiles
 */
module.exports = {
    /**
     * summary: 
     * description: Gets `Profile` objects.
Optional query param of **size** determines
size of returned array

     * parameters: size
     * produces: application/json
     * responses: 200, default
     * operationId: 
     */
    get: {
        200: Mongeese.get(Profile)
    },
    /**
     * summary: 
     * description: Create a new `profile`

     * parameters: data
     * produces: application/json
     * responses: 200
     * operationId: 
     */
    post: {
        200: Mongeese.post(Profile)
    }
};
