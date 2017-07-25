var Recipte=require('../models/recipte').Recipte;


exports.get = function(req,res,next){
    if (req.params.id){
        Recipte.find({bid:req.params.id},function (err,recipte){
            if (err) return next(err);
            res.json(recipte);
        })
    } else {
        Recipte.find({},function (err,recipte){
            if (err) return next(err);
            res.json(recipte);
        })
    }

};

exports.post = function(req,res,next){
    Recipte.add(req.body.name,req.body.category,function(err,recipte){
        if (err) return next(err);
        res.send(recipte)
    });

    };