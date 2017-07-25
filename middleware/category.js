var Category=require('../models/category').Category;


exports.get=function (req,res,next){
    console.log(req.params);
    if (req.params.id){
        Category.find({bid:req.params.id},function(err,categoty){
            if (err) return err;
            res.json(categoty);
        });
    } else {
        Category.find({},function(err,categoty){
            if (err) return err;
            res.json(categoty);
        });
    }

};

exports.post = function(req,res,next){
    Category.add(req.body.name,function(err,category){
        if (err) return next(err);
        res.send(category)
    });

};