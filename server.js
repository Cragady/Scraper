var express = require("express"),
    exphbs = require("express-handlebars"),
    bodyParser = require("body-parser"),
    cheerio = require("cheerio"),
    request = require("request"),
    app = express(),
    PORT = process.env.PORT || 3000
;

require("./routes/mongo")(app);

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