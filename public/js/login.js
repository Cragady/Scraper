$("#login").click(function(e){
    e.preventDefault();
    var creds = {
        username: $("#username-input").val().trim(),
        password: $("#password-input").val().trim(),
    }
    console.log(creds);
    $.ajax("/new-user-create", {
        type: "POST",
        data: creds
    });
}); 