var mongoose = require('mongoose');
var config =require('../config/index');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.connect(config.get('mongoose:uri'),config.get('mongoose:options'));


module.exports=mongoose;