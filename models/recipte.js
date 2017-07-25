var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;
var Category=require('../models/category').Category;
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
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }


});

schema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'recipteid'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.bid = counter.seq;
        next();
    });
});


schema.statics.add= function (name,category,cb){
    var Recipte=this;
    Category.find({bid:category},function(err,item){
        if (err) return err;
        var recipte = new Recipte({name:name,category:item[0]._id});
        console.log(recipte);
        recipte.save(function (err,recipte){
            if (err) return cb(err);
            Recipte.findOne({bid:recipte.bid}).populate('category').exec( function(err,recipte){
                if (err) return err;
                return cb(null,recipte);
            });
        },cb);
    });

};


var Recipte = mongoose.model('Recipte', schema);

exports.Recipte = Recipte;