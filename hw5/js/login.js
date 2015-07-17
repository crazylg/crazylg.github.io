var ref = new Firebase('https://blistering-torch-2081.firebaseio.com/');

var create_button = document.getElementById("create_button");
create_button.addEventListener('click', function () {
    var account = $('#Account').val();
    var password = $('#Password').val();
    ref.createUser({
        email: account,
        password: password
    }, function (error, userData) {
        if (error) {
            switch (error.code) {
                case "EMAIL_TAKEN":
                    alert("The new user account cannot be created because the email is already in use.");
                    break;
                case "INVALID_EMAIL":
                    alert("The specified email is not a valid email.");
                    break;
                default:
                    alert("Error creating user:", error);
            }
        } else {
            alert("Create Successfully!")
            console.log("Successfully created user account with uid:", userData.uid);
        }
    });
})

var login_button = document.getElementById("login_button");
login_button.addEventListener('click', function () {

    var account = $('#Account').val();
    var password = $('#Password').val();

    // Create a callback to handle the result of the authentication
    function authHandler(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
        }
    }

    // Authenticate users with a custom authentication token
    ref.authWithCustomToken("<token>", authHandler);

    // Alternatively, authenticate users anonymously
    ref.authAnonymously(authHandler);

    // Or with an email/password combination
    ref.authWithPassword({
        email: account,
        password: password
    }, authHandler);

    // Or via popular OAuth providers ("facebook", "github", "google", or "twitter")
    ref.authWithOAuthPopup("<provider>", authHandler);
    ref.authWithOAuthRedirect("<provider>", authHandler);
});