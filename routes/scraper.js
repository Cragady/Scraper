module.exports = function (app, db, cheerio, request){

    app.get("/", function(req, res){

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
                    if(req.session.userId){
                        db.Users.find({_id: req.session.userId}, function(err, user){
                            // var login = {
                            //     user: user[0].username
                            // }
                            
                            var newRes = {
                                links: response,
                                seshId: req.session.userId,
                                user: user[0].username,
                            };
                            res.render("index", {newRes});
                        });
                    } else {
                        var newRes = {
                            links: response,
                        };
                        res.render("index", {newRes});
                    };
                });
            } catch(err) {
                res.render("index");
            };
        });

        
    });

    app.get("/login", function(req, res){
        if(req.session.userId){
            res.redirect("/");
        } else {
            res.render("sin-log");
        }
    });

    app.post("/logout", function(req, res, next){
        if(req.session){
            req.session.destroy(function(err){
                if(err) throw err;
                res.end();
            });
        } else {
            res.end();
        };
    });

    app.get("/link-sets", function(req, res){
        request("https://techcrunch.com/", function(err, response, html){
            var $ = cheerio.load(html);
            
            $(".river--homepage").children().each(function(i, element){
                var title = $(element).find("a.post-block__title__link").text().trim(),
                summary = $(element).find("div.post-block__content").text().trim(),
                link = $(element).find("a.post-block__title__link").attr("href"),
                results = []
                ;
        
                if(title){
                    results.push({
                        headline: title,
                        summary: summary,
                        url: link
                    });
                };
                db.Links.create(results).then(function(err, found){
                    if(err) {
                        res.status(404);
                    };
                });
            });

            res.end();
        });
    });
};