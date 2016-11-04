'use strict';
/*global require */
var _ = require('lodash');

/*global module, _ */
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
    return function(req, res, callback){
        Model.findById(req.params.id, function (err, model) {
          if (err) {
            return callback(err);
          }
          
          _.merge(model, req.body);

          model.save(function (err, updatedModel) {
            if (err) {
                return callback(err);
            }else {
                return callback(null, {responses: updatedModel});
            }
          });
        });
    };
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

function verbGetById(Model) {
    return function (req, res, callback) {
        Model.findOne({'_id': req.params.id}, function(err, existingInstance) {
            if (err) {
                return callback(err);
            } else {
                return callback(null, {responses: existingInstance});
            }
        });
    };
}

function verbGet(Model){
    return function(req, res, callback){
        Model.find(function(err, res){
            if (err){
                return callback(err);
            } else {
                return callback(null, {responses: res});
            }
        });
    };
}

module.exports = {
    post: verbPost,
    put: verbPut,
    get: verbGet,
    getById: verbGetById,
    getCount: verbGetCount,


};