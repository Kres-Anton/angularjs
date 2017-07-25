var crypto = require('crypto');
var async=require('async');
var util=require('util');


var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    role:{
        type:String,
        required:true,
        default:"G"
    },
    confirmReg:{
        type:Boolean,
        required:true,
        default: false
    },
    eMail:{
        type:String
    }
});

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize= function (username,password,callback){
    var User=this;
    async.waterfall([
        function(callback){
            User.findOne({username:username},callback);
        },function(user,callback){
            if (user) {

                if (user.checkPassword(password)) {
                    callback(null,user);
                } else {
                    callback(new authError("Пароль неверен"));
                }
            } else {
                var user = new User({username:username,password:password});
                user.save(function (err){
                    if (err) return callback(err);
                    callback(null,user);
                    res.send({username:user.username});
                });
            }
        }
    ],callback);
};

exports.User = mongoose.model('User', schema);


function authError(message){
    Error.apply(this,arguments);
    Error.captureStackTrace(this,authError);

    this.message=message;
}

util.inherits(authError,Error);

authError.prototype.name = 'authError';

exports.authError = authError;