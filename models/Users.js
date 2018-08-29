var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt')
;

var UsersSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    savedArr: {
        type: Array,
    },
    password: {
        type: String,
        required: true,
    },
    
});

//prehook for scrambling  words to eveusd234 sd4$8sdleSd988&^lk
UsersSchema.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err){
            return next(err);
        };
        user.password = hash;
        next();
    });
});

//authentication 

UsersSchema.statics.authenticate = function(username, password, callback){
    Users.findOne({username: username})
        .exec(function(err, user){
            if(err){
                return callback(err)
            } else if(!user){
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            };
            bcrypt.compare(password, user.password, function(err, result){
                if(result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                };
            });
        });
};

var Users = mongoose.model('Users', UsersSchema);
module.exports = Users;