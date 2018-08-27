var express = require("express"),
    exphbs = require("express-handlebars"),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    cheerio = require("cheerio"),
    request = require("request"),
    app = express(),
    mongojs = require("mongojs"),
    MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines",
    mongoose = require("mongoose"),
    db = require("./models"),
    PORT = process.env.PORT || 3000
;

//sets different database connection when deployed
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//da meat
app.use(express.static("public"));

//middleware wazoo
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
}));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//uses the routes set in ./routes
require("./routes/mongo")(app, db, mongojs);
require("./routes/scraper")(app, db, cheerio, request);

app.listen(PORT, function(){
    console.log("Server is listening to you . . . ON PORT: %s. http://localhost:%s/",
        PORT,
        PORT
    );
});