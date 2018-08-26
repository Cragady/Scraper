module.exports = function(app, db){

    
    app.get("/tester", function(req, res){
        console.log(req.session.userId);
        res.end();
    });

    app.get("/login-test", function(req, res){
        res.render("loginTest");
    })

    app.post("/new-user-create", function(req, res){
        //checking if the proper credentials are given
        console.log(req.body);
        if(req.body.username &&
            req.body.password){
            //sets the userData
            var userData = {
                username: req.body.username,
                password: req.body.password,
            };
            //throw it in the db
            db.Users.create(userData, function(err, user){
                if(err){
                    return next(err);
                } else {
                    console.log(user._id);
                    req.session.userId = user._id;
                    return res.redirect('/login-test');
                };
            });
        };
    });

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