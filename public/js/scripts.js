console.log("hello world!");

function scrapinIt(){
    $("#da-scraper").click(function(){
        $.ajax("/link-sets", {
            type: "GET"
        }).then((returnUrl)=>{
            $("#dump").empty();
            $.each(returnUrl, function(i, newb){
                $("#dump").append(`<div>${returnUrl[i].headline}</div>`);
            });
        });
    });
};

$(document).ready(function(){
    scrapinIt();
});