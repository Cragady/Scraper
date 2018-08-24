module.exports = function(app, db){
    app.get("/read-data-url", function(req, res){
        db.Links.find().limit(10)
        .sort({$natural: -1})
        .exec(function(err, response){
            if(err) throw err;
            // console.log(response);
            res.json(response);
        });
    });
};