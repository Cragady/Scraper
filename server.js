var express = require("express"),
    exphbs = require("express-handlebars"),
    bodyParser = require("body-parser"),
    cheerio = require("cheerio"),
    request = require("request"),
    app = express(),
    MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines",
    mongoose = require("mongoose"),
    // databaseUrl = "mongoHeadlines",
    // collections = "urlData",
    PORT = process.env.PORT || 3000
;

//sets different database connection when deployed
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//uses the routes set in ./routes
require("./routes/mongo")(app);
require("./routes/scraper")(app, cheerio, request);

//the rest of the server
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.listen(PORT, function(){
    console.log("Server is listening to you . . . ON PORT: %s. http://localhost:%s/",
        PORT,
        PORT
    );
});