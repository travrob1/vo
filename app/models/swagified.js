'use strict';

var swaggerMongoose = require('swagger-mongoose'); 
var fs = require('fs');
var swagger = fs.readFileSync('./config/swagger.json');
var models = swaggerMongoose.compile(swagger).models;

module.exports = models;
