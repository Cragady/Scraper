var mongoose = require("mongoose"),
    Schema = mongoose.Schema
;

var CommentsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    comment: {
        type: String,
        validate: [
            function(input){
                return input.length >= 1;
            },
            "Please create a valid comment"
        ],
    },
});

var Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;