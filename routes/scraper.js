module.exports = function (app, cheerio, request){
    app.get("/link-sets", function(req, res){
        request("https://old.reddit.com/r/technology", function(err, response, html){
            var $ = cheerio.load(html),
                results = []
            ;
    
            $("p.title").each(function(i, element){
                var title = $(element).text(),
                    link = $(element).children().attr("href")
                ;
    
                results.push({
                    title: title,
                    link: link
                });
            });
            console.log(results);
        });
    });
};