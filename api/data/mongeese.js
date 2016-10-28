'use strict';

function verbPost(Model) {
    return function (req, res, callback) {
        var instance = new Model(req.body);
        instance.save(function(err) {
            if (err) {
                return callback(err);
            } else {
                return callback(null, {responses: instance});
            }
        });
    };
}

function verbPut(Model) {
    var instance = new Model(req.body);
    instance.save(function(err) {
        if (err)
            throw err;
        return callback(null, {responses: instance});
    });
}


function verbGetCount(req, Model, callback) {
    var instance = new Model(req.body);
    instance.save(function(err) {
            if (err) {
                return callback(err);
            } else {
                return callback(null, {responses: instance});
            }
    });
}

    
function verbGetById(req, Model, callback) {
    var instance = new Model();
    console.log(req);
    instance.findOne({'_id': 'asdf'}, function(err, existingInstance) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, {responses: existingInstance});
        }
    });
}

module.exports = {
    verbPost: verbPost,
    verbGetById: verbGetById,
}