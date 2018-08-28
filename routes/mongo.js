module.exports = function(app, db, mongojs){

    app.post("/new-user-create", function(req, res){
        //checking if the proper credentials are given
        if(req.body.username &&
            req.body.password){
            //sets the userData
            var userData = {
                username: req.body.username,
                password: req.body.password,
            };
            //throw it in the db
            try{
                db.Users.create(userData, function(err, user){
                    if(err){
                        console.log(err);
                        res.json("/login");
                    } else {
                        req.session.userId = user._id;
                        res.json("/");
                    };
                });
            } catch(err){
                res.json("/login");
            }
        };
    });

    app.post("/break-in", function(req, res){

        function cbackAuth(errIn, userIn){
            if(userIn && (errIn === null)){
                req.session.userId = userIn._id;
                res.json("/");
            } else {
                res.json("/login");
            }
        };

        db.Users.authenticate(
                req.body.username, 
                req.body.password,
                cbackAuth
        )
    });

    app.post("/bringing-a-comment-into-the-world", function(req, res){
        var commentMade = {
            comment: req.body.comment,
            user: req.session.userId,
            link: req.body.l_id,
        };
        if(commentMade.comment && commentMade.user){
            db.Comments.create(commentMade)
                .then((made) => {
                    res.json(made);
                })
                .catch(function(err){
                    res.json(err);
                });
        } else {
            res.json("needs login");
        };
    });

    app.delete("/comment-death", function(req, res){
        if(req.session.userId === req.body.commOp){
            console.log("hit");
            db.Comments.deleteOne({_id: req.body.commId}, function(err, dont){
                if(err) throw err;
                res.end();
            });
        };
    });

    app.get("/read-data-url", function(req, res){
        db.Links.find().limit(10)
        .sort({$natural: -1})
        .exec(function(err, response){
            if(err) throw err;
            var resPass = [];
            for(var i = 0; i < response.length; i++){
                resPass.push(response[i]._id);
            };
            try{
                //db.Comments.find({link: mongojs.ObjectId("5b8367649fac37590c0bcde8")}, function(err, res2){
                db.Comments.find({link: {$in: resPass}}, function(err, res2){
                    var newRes = {
                        links: response,
                        comments: res2,
                        seshId: req.session.userId
                    };
                    res.json(newRes);
                });
            } catch(err) {
                res.json(response);
            };
        });
    });

    app.get("/comments-show/:finder", function(req, res){
        var finder = req.params.finder;
        db.Comments.find({
            link: mongojs.ObjectId(finder)
        }, function(err, found){
            if(err) throw err;
            if(found.length === 0){
                return res.end();
            }
            var commsPasser = {
                comments: found,
                seshId: req.session.userId
            }
            res.json(commsPasser);
        });
    });

    app.put("/saving-an-artice-from-a-firey-death", function(req, res){
        if(req.session.userId){
            db.Users.update(
                {_id: req.session.userId}, 
                {$addToSet: {savedArr: req.body.artId}}, function(err, artUpped){
                    res.json(artUpped);
                });
        } else {
            res.json("needs login");
        };
    });

    app.put("/dooming-an-article", function(req, res){
        if(req.session.userId){
            db.Users.update(
                {id: req.session.userId},
                {$pull: {savedArr: req.body.artId}}, function(err, artUpped){
                    res.json(artUpped);
                });
        } else {
            res.json("needs login");
        };
    });
};