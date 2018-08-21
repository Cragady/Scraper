module.exports = function(app){
    app.get("/read-data-test", function(req, res){
        res.json("yes");
    });
};