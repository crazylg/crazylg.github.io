var ref = new Firebase('https://blistering-torch-2081.firebaseio.com');
var users = ref.child('user');
var messages = ref.child('messages');
var userlistref;

//current user's name and ref object
var current_nickname;
var current_userref;
var login_time;

//get users
users.on("value", function (snapshot) {
    userlistref = snapshot.val();
    var t = new giveUserList();
});

//whether the nickname is already used or not
function isExist(curname) {
    var Exist = false;
    for (var attr in userlistref) {
        if (curname === userlistref[attr].name) {
            Exist = true;
        }
    }
    return Exist;
};

//show userlist
function giveUserList() {
    $('#userlist').empty();
    for (var attr in userlistref) {
        var div = document.createElement("DIV");
        div.className = "usercard";
        div.id = attr;
        div.innerHTML = userlistref[attr].name + '</br>login time:' + userlistref[attr].login_time;
        $('#userlist').append(div);
        document.getElementById('userlist').scrollTop = document.getElementById('userlist').scrollHeight;
    }
};

//send message
function sendMessage(username, message) {
    var mydate = new Date();
    var time = mydate.toLocaleTimeString();
    if (message != "") {
        messages.push({name:current_nickname, text:message, sendtime:time});
    }
    var box = document.createElement("DIV");
    box.className = "message_send";
    box.innerHTML = message + "</br>" + username + "&nbsp&nbsp" + time;
    $('#chatpart_text').append(box);
    document.getElementById('chatpart_text').scrollTop = document.getElementById('chatpart_text').scrollHeight;
};

//get message
messages.on('child_added', function (snapshot) {
    var get = snapshot.val();
    if (get.name != current_nickname && get.sendtime > login_time) {
        var mydate = new Date();
        var time = mydate.toLocaleTimeString();
        var box = document.createElement("DIV");
        box.className = "message_get";
        box.innerHTML = get.text + "</br>" + get.name + "&nbsp&nbsp" + get.sendtime;
        $('#chatpart_text').append(box);
        document.getElementById('chatpart_text').scrollTop = document.getElementById('chatpart_text').scrollHeight;
    }
})


$(window).load(function () {
    $('#creat_nickname_button').click(function () {
        current_nickname = $('#nickname_input').val();

        if (current_nickname === "") {
            alert("Nickname should not be null!");
        }
        else {
            if (!isExist(current_nickname)) {
                var myDate = new Date();
                var time = myDate.toLocaleString();
                login_time = time;
                current_userref = users.push({ name: current_nickname, login_time: time });
                $('#nickname').css("display", "none");
                $('#lock').css("display", "none");
                var t = new giveUserList();
                current_userref.onDisconnect().remove();
            }
            else {
                alert("The nickname has been taken!");
            }
        }
    });

    $('#chatpart_send').click(function () {
        var message = $('#chatpart_inputtext').val();
        var t = new sendMessage(current_nickname, message);
        $('#chatpart_inputtext').val('');
    });
});