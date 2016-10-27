'use strict';

function verbPost(Model) {
    return function (req, res, callback) {
        var newProfile = new Model(req.body);
        newProfile.save(function(err) {
            if (err)
                throw err;
            return callback(null, {responses: newProfile});
        });
    };
}

function verbPut(Model) {
    var newProfile = new Model(req.body);
    newProfile.save(function(err) {
        if (err)
            throw err;
        return callback(null, {responses: newProfile});
    });
}

function verbGet(req, Model, callback) {
    var newProfile = new Model(req.body);
    newProfile.save(function(err) {
        if (err)
            throw err;
        return callback(null, {responses: newProfile});
    });
}

module.exports = {
    verbPost: verbPost,
    verbPut: verbPut,
    verbGet: verbGet,
}