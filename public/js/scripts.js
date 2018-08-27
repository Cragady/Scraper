function dbCall(){
    $.get("/read-data-url", ()=>{}).then((content) =>{
        if(content.comments){
            var comms = content.comments,
                linns = content.links;
        } else {
            var linns = content;
        }
        $("#dump").empty();
        $.each(linns, function(i){
            $("#dump").append(`<section class="card row dump-scraper my-2 text-center p-1">
                <div class="headline-scrape card-header">
                    <h3>${linns[i].headline}</h3>
                </div>
                <div class="summary-scrape">
                    ${linns[i].summary}...
                </div>
                <div class="url-scrape">
                    <a href="${linns[i].url}" target="_blank" class="mb-1">Read Me!</a>
                </div>
                <div class="m-2 card-footer">
                <button class="btn article-save m-1" data-id="${linns[i]._id}">Save Article</button>
                    <section class="comment-dump col-12 border-top mt-3" id="${linns[i]._id}">
                        <button class="btn comment-view m-2" data-id="${linns[i]._id}">Toggle Comments</button>
                            
                        <div class="c-view-switch" style="display: none">
                            <div class="para-com-dump">
                                <p class="card m-1 text-left px-1">test
                                test</p>
                                
                            </div>

                            <div class="input-group mb-3">
                                <textarea type="text" class="form-control" placeholder="Comment Here" aria-label="Recipient's username" aria-describedby="basic-addon2"></textarea>
                                <div class="input-group-append">
                                    <button class="input-group-text btn c-sub" data-id="${linns[i]._id}" id="basic-addon2">submit</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>`);
        });

        if(comms){
            $.each(comms, (i) =>{
                var finder = comms[i].link;
                $("#" + finder).find(".para-com-dump")
                    .append(`<p class="card m-1 text-left px-1 data-user="${comms[i].user}">
                    ${comms[i].comment}
                    </p>`);
            });
        };
    });
};

//do things here for commenting/saving articles after user
//log in is implemented
function comClick(){
    $(document).on({
        click: function(e){
        e.preventDefault();
        switch(true){
            case $(this).attr("id") === "signup":
                var userCreds = {
                    username: $("#username-input").val().trim(),
                    password: $("#password-input").val().trim(),
                };
                $.post("/new-user-create", userCreds, ()=>{})
                .then((data) =>{
                    window.location.replace(data);   
                });
                break;
            case $(this).attr("id") === "login":
                var userCreds = {
                    username: $("#username-input").val().trim(),
                    password: $("#password-input").val().trim(),
                };
                $.post("/break-in", userCreds, ()=>{})
                .then(data =>{
                    window.location.replace(data);
                })
                break;
            case $(this).hasClass("comment-view"):
                var idGrab = $(this).attr("data-id");
                $("#" + idGrab).find(".c-view-switch").toggle("display");
                break;
            case $(this).hasClass("c-sub"):
                var idGrab = $(this).attr("data-id");
                var cSect = "#" + idGrab;
                var infoPass = {
                    comment: $(cSect).find("textarea").val().trim(),
                    l_id: idGrab,
                };
                if(infoPass.comment !== ""){
                    $.post("/bringing-a-comment-into-the-world", infoPass, ()=>{
                    }).then((response)=>{
                        if(response === "needs login"){
                            $("#login-req").modal("show");
                            return;
                        };
                        var idParam = response.link;
                        $.get("/comments-show/" + idParam, ()=>{
                        }).then(theseComms => {
                            var finder = theseComms[0].link;
                            $("#" + finder).find(".para-com-dump").empty();
                            $("#" + finder).find("textarea").val("");
                            $.each(theseComms, (i) =>{
                                $("#" + finder).find(".para-com-dump")
                                    .append(`<p class="card m-1 text-left px-1 data-user="${theseComms[i].user}">
                                    ${theseComms[i].comment}
                                    </p>`);
                            });
                        });
                    });
                };
                break;
            case $(this).hasClass("article-save"):
                $.put("/article-saver", artNum, ()=>{
                }).then(()=>{
                    console.log("saved!");
                });
            default: 
                console.log("please do something");
                return;
        };
        }
    }, "button");
};

function scrapinIt(){
    $("#da-scraper").click(function(){
        $.get("/link-sets", ()=>{}).then(()=>{
            dbCall();
        });
    });
};

$(document).ready(function(){
    scrapinIt();
    dbCall();
    comClick();
});