var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;
var counter=require('../models/counter').counter;

var schema = new Schema({
    bid: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }


});

schema.pre('save', function(next) {
    counter.findByIdAndUpdate({_id: 'categotyid'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        next();
    });
});


schema.statics.add= function (name,cb){
    var Category=this;
    var category = new Category({name:name});

    category.save(function (err,category){
        if (err) return cb(err);
        return cb(null,category);
    },cb);
};


var Category = mongoose.model('Category', schema);

exports.Category = Category;