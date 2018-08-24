function dbCall(){
    $.ajax("/read-data-url", {
        type: "GET"
    }).then(returnUrl =>{
        $("#dump").empty();
        $.each(returnUrl, function(i, newb){
            $("#dump").append(`<section class="card dump-scraper my-2 text-center p-1">
                <div class="headline-scrape card-header">
                    <h3>${returnUrl[i].headline}</h3>
                </div>
                <div class="summary-scrape">
                    ${returnUrl[i].summary}
                </div>
                <div class="url-scrape">
                    <a href="${returnUrl[i].url}">${returnUrl[i].url}</a>
                </div
            </section>`);
        });
    });
};

function scrapinIt(){
    $("#da-scraper").click(function(){
        $.ajax("/link-sets", {
            type: "GET"
        }).then(()=>{
            dbCall();
        });
    });
};

$(document).ready(function(){
    scrapinIt();
    dbCall();
});