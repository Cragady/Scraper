var mongoose = require("mongoose"),
    Schema = mongoose.Schema
;

var CommentsSchema = new Schema({
    op: String,
    comment: {
        type: String,
        validate: [
            function(input){
                return input.length >= 1;
            },
            "Please create a valid comment"
        ]
    }
});

var Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;