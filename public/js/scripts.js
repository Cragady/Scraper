function dbCall(){
    $.ajax("/read-data-url", {
        type: "GET"
    }).then(returnUrl =>{
        $("#dump").empty();
        $.each(returnUrl, function(i, newb){
            $("#dump").append(`<section class="card row dump-scraper my-2 text-center p-1">
                <div class="headline-scrape card-header">
                    <h3>${returnUrl[i].headline}</h3>
                </div>
                <div class="summary-scrape">
                    ${returnUrl[i].summary}...
                </div>
                <div class="url-scrape">
                    <a href="${returnUrl[i].url}" target="_blank" class="mb-1">Read Me!</a>
                </div>
                <div class="m-2 card-footer">
                <button class="btn article-save m-1" data-id="${returnUrl[i]._id}">Save Article</button>
                    <section class="comment-dump col-12 border-top mt-3" id="${returnUrl[i]._id}">
                        <button class="btn comment-view m-2" data-id="${returnUrl[i]._id}">Toggle Comments</button>
                            
                        <div class="c-view-switch">
                            <div class="para-com-dump">
                                <p class="card m-1 text-left px-1">test
                                test</p>
                                
                            </div>

                            <div class="input-group mb-3">
                                <textarea type="text" class="form-control" placeholder="Comment Here" aria-label="Recipient's username" aria-describedby="basic-addon2"></textarea>
                                <div class="input-group-append">
                                    <button class="input-group-text btn c-sub" data-id="${returnUrl[i]._id}" id="basic-addon2">submit</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>`);
        });
    });
};

//do things here for commenting/saving articles after user
//log in is implemented
function comClick(){
    $(document).on({
        click: function(e){
        e.preventDefault();
        switch(true){
            case $(this).attr("id") === "login":
                var userCreds = {
                    username: $("#username-input").val().trim(),
                    password: $("#password-input").val().trim(),
                };
                console.log(userCreds);
                //this is a testing call, change it
                //to the appropriate values when testing is through
                $.ajax("/new-user-create", {
                    type: "POST",
                    data: {
                        username: $("#username-input").val().trim(),
                        password: $("#password-input").val().trim(),
                    }
                }).then((data) =>{
                    $('body').replaceWith(data);   
                });
                console.log("pre-fire");
                break;
            case $(this).hasClass("comment-view"):
                $(".c-view-switch").toggle("display");
                break;
            case $(this).hasClass("c-sub"):
                var idGrab = $(this).attr("data-id");
                var cSect = "#" + idGrab;
                console.log(cSect);
                var commentMade = $(cSect).find("textarea").val().trim();
                console.log(commentMade);
                if(commentMade !== ""){
                    $(cSect).find("textarea").val("");
                    $(cSect).find(".para-com-dump").append(`
                        <p class="card m-1 text-left px-1">${commentMade}</p>
                    `)
                }
                break;
            case $(this).hasClass("tester"):
                console.log("tester-class");
            default: 
                console.log("please do something");
                return;
        };
        }
    }, "button");
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
    comClick();
});