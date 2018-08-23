module.exports = function(app, db){
    app.get("/read-data-test", function(req, res){
        db.Links.find({}, function(err, response){
            if(err) throw err;
            res.json("yes");
        })
    });
};