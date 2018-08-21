console.log("hello world!");

function scrapinIt(){
    $("#da-scraper").click(function(){
        $.ajax("/link-sets", {
            type: "GET"
        }).then((returnUrl)=>{
            $.each(returnUrl, function(i, newb){
                $("#dump").append(`<div>${returnUrl[i].title}</div>`);
            });
        });
    });
};

$(document).ready(function(){
    scrapinIt();
});