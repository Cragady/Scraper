module.exports = function (app, db, cheerio, request){

    app.get("/", function(req, res){
        res.render("index");
    });

    app.get("/link-sets", function(req, res){
        request("https://techcrunch.com/", function(err, response, html){
            var $ = cheerio.load(html),
                results = []
            ;
    
            $(".river--homepage").children().each(function(i, element){
                var title = $(element).find("a.post-block__title__link").text().trim(),
                    summary = $(element).find("div.post-block__content").text().trim(),
                    link = $(element).find("a.post-block__title__link").attr("href")
                ;
        
                results.push({
                    headline: title,
                    summary: summary,
                    url: link
                });
            });
            console.log(results);
            db.Links.create(results).then(function(err, found){
                res.json(results);
            });
        });
    });
};