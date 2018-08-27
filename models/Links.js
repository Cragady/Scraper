var mongoose = require("mongoose"),
    Schema = mongoose.Schema
;

var LinksSchema = new Schema({
    headline: {
        type: String,
        unique: true
    },
    summary: String,
    url: {
        type: String,
        unique: true
    },
});

var Links = mongoose.model("Links", LinksSchema);

module.exports = Links;