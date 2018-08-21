var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines",
    mongoose = require("mongoose")
;

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

module.exports = function(app){
    app.get("/read-data-test", function(req, res){
        res.json("yes");
    });
};