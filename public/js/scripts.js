function dbCall(){
        $.get("/read-data-url", ()=>{}).then((content) =>{
            logCheck();
            if(content.comments){
                    var comms = content.comments,
                        linns = content.links;
                    appendix(comms, content.seshId, true);
            } else {
                location.reload();
            };
        });
};

function logCheck(){
    $.get("user-chec", ()=> {}).then((res)=>{
        if(res === "login required"){
            return;
        } else {
            console.log("arssty" + res);
            console.log(res.arr);
            var arrIter = res.arr;
            $.each(arrIter, function(i){
                $("#save-article-" + arrIter[i]).empty();
                $("#save-article-" + arrIter[i]).append(`
                    <h3 class="text-success">Saved!</h3>
                    <button class="btn article-unsave btn-danger m-1" data-id="${arrIter[i]}">Unsave Article</button>
                `);
            });
            //code here
        };
    });
};

function appendix(contC, usId, multi){
    var finder = contC[0].link;
    if(contC){
        if(!multi){
            $("#" + finder).find(".para-com-dump").empty();
            $("#" + finder).find("textarea").val("");
        }
        $.each(contC, function(i){
            if(multi){
                finder = contC[i].link;
            };
            if(contC[i].user === usId){
                $("#" + finder).find(".para-com-dump")
                    .append(`
                            <div class="card">
                                <p class="card-header">You Wrote:</p>
                                <p class="card m-1 text-left px-1">
                                    ${contC[i].comment}
                                </p>
                                <div class="col-6 text-left ml-2 p-0">
                                    <button type="button" title="Delete Comment" 
                                        class="killing-comments btn btn-danger p-1 my-2 text-left" 
                                        data-user="${contC[i].user}"
                                        data-comment="${contC[i]._id}"
                                        data-link="${contC[i].link}">
                                    Delete Comment
                                    </button>
                                </div>
                            </div>
                            <hr>
                    `);
            } else {
                $("#" + finder).find(".para-com-dump")
                    .append(`
                    <p class="card m-1 text-left px-1 data-user="${contC[i].user}">
                        ${contC[i].comment}
                    </p>
                    <hr>
                    `);
            };
        });
    }
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
            case $(this).attr("id") === "break-out":
                $.post("/logout", ()=>{})
                    .then(() =>{
                        window.location.reload();
                    });
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
                        }).then(incomingComms => {
                            var theseComms = incomingComms.comments;
                            appendix(theseComms, incomingComms.seshId);
                        });
                    });
                };
                break;
            case $(this).hasClass("killing-comments"):
                var commSpecs = {
                    commOp: $(this).attr("data-user"),
                    commId: $(this).attr("data-comment"),
                    commLink: $(this).attr("data-link")
                };
                $.ajax("/comment-death", {
                    type: "DELETE",
                    data: commSpecs
                }).then(() =>{
                    $.get("/comments-show/" + commSpecs.commLink, ()=>{
                    }).then(response =>{
                        var survivingComms = response.comments;
                        if(survivingComms){
                            appendix(survivingComms, response.seshId);
                        } else {
                            $("#" + commSpecs.commLink).find(".para-com-dump").empty();
                        };
                    });
                });
                break;
            case $(this).hasClass("article-save"):
                var artSpecs = {
                    artId: $(this).attr("data-id")
                };
                $.ajax("/saving-an-artice-from-a-firey-death", {
                    type: "PUT",
                    data: artSpecs
                }).then((response) =>{
                    if(response === "needs login"){
                        $("#login-req").modal("show");
                        return;
                    };
                    console.log("saved!");
                    logCheck();
                });
                break;
            case $(this).hasClass("article-unsave"):
                var artSpecs = {
                    artId: $(this).attr("data-id")
                };
                $.ajax("/dooming-an-article", {
                    type: "PUT",
                    data: artSpecs
                }).then((response) =>{
                    if(response === "needs login"){
                        $("#login-req").modal("show");
                        return;
                    } else {
                        $("#save-article-" + artSpecs.artId).empty();
                        $("#save-article-" + artSpecs.artId).append(`
                            <button class="btn article-save m-1" data-id="${artSpecs.artId}">Save Article</button>
                        `);
                        $("#kaibosh-it-" + artSpecs.artId).remove();
                    };
                });
            case $(this).attr("id") === "view-saved":
                console.log("hit saved arrrrss");
                $.get("/reading-saved-arts");
                break;
            case $(this).attr("id") === "da-scraper":
                $.get("/link-sets", ()=>{}).then(()=>{
                    location.reload();
                });
                break;
            default: 
                console.log("please do something");
                return;
        };
        }
    }, "button");
};

$(document).ready(function(){
    dbCall();
    // appendix(comms, content.seshId, true);
    comClick();
});