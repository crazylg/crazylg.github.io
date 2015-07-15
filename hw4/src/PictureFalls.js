MAX_PICTURE_NUM = 50;
picturenum = 8;
current_latitude = 40;
current_longitude = 116;

function getDistance() {
    debugger;
    var info = document.getElementsByClassName('info');
    for (var i = 0; i < info.length; i++) {
            var num = Number(info[i].parentNode.id.replace("Li", ""));
            var startLatRads = current_latitude / 180 * Math.PI;
            var startLongRads = current_longitude / 180 * Math.PI;
            var destLatRads = location_list[i].latitude / 180 * Math.PI;
            var destLongRads = location_list[i].longitude / 180 * Math.PI;
            var Radius = 6371;

            var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads)
                         + Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads)) * Radius;

            distance = parseInt(distance);
            info[i].innerHTML = '<p style="font-size:2em">' + distance + 'Km' + '</p>';
    }
};

function addEventToAllpicture() {
    var imglist = document.getElementsByTagName("IMG");
    for (var i = 0; i < imglist.length; i++) {
        var t = new clickevent(imglist[i].id.toString());
    }
};

function clickevent(id) {
    var body = document.getElementsByTagName("BODY")[0];
    var bgObj = document.createElement("DIV");
    if ((document.getElementById(id).src.indexOf("resource") == -1) && (document.getElementById(id).onclick == null)) {
        document.getElementById(id).addEventListener("click", function (e) {
            var pic = document.createElement("DIV");
            var comment = document.createElement("DIV");
            var comment1 = document.createElement("DIV");
            var comment2 = document.createElement("DIV");
            var comment3 = document.createElement("DIV");
            var button1 = document.createElement("BUTTON");
            var button2 = document.createElement("BUTTON");
            var innerimg = document.createElement("IMG");

            //the style of img
            innerimg.src = document.getElementById(id).src.replace("mini", "");
            var oriheight = innerimg.naturalHeight;
            var oriwidth = innerimg.naturalWidth;
            var imgheight = (window.innerHeight * 0.8).toString() + 'px';
            innerimg.style.cssText = "float:left;z-index:9010;" + "height:" + imgheight;
            var number1 = 0;
            var number2 = 1;
            var number3 = 2;
            //the style of comment
            var commentwidth = (window.innerWidth * 0.175).toString() + 'px';
            comment.style.cssText = "font-family:'Microsoft YaHei UI';text-indent: 2em;word-break: break-all;word-wrap:break-word;margin-left:10px;text-align:left;"
                                  + "float:left;position:relative;top:2.5%;buttom:20px"
                                  + "box-shadow:0 0 10px #888888;background: white;filter: alpha(Opacity=100); -moz-opacity:1;opacity:1; color: black;z-index:9005;height:95%;width:"
                                  + commentwidth;
            comment.id = "comment" + Number(id.replace("img", ""));
            comment1.style.cssText = "font-family:'Microsoft YaHei UI';text-indent: 2em;word-break: break-all;word-wrap:break-word;margin-left:10px;text-align:left;"
                                  + "float:left;position:relative;top:2%;"
                                  + "box-shadow:0 0 10px pink;background: white;filter: alpha(Opacity=100); -moz-opacity:1;opacity:1; color: black;z-index:9005;height:25%;width:95%";
            comment1.innerText = comment_list[comment_liston[Number(id.replace("img", ""))][number1]];

            comment2.style.cssText = "font-family:'Microsoft YaHei UI';text-indent: 2em;word-break: break-all;word-wrap:break-word;margin-left:10px;text-align:left;"
                                  + "float:left;position:relative;top:3%;"
                                  + "box-shadow:0 0 10px pink;background: white;filter: alpha(Opacity=100); -moz-opacity:1;opacity:1; color: black;z-index:9005;height:25%;width:95%";
            comment2.innerText = comment_list[comment_liston[Number(id.replace("img", ""))][number2]];

            comment3.style.cssText = "font-family:'Microsoft YaHei UI';text-indent: 2em;word-break: break-all;word-wrap:break-word;margin-left:10px;text-align:left;"
                                  + "float:left;position:relative;top:4%;"
                                  + "box-shadow:0 0 10px pink;background: white;filter: alpha(Opacity=100); -moz-opacity:1;opacity:1; color: black;z-index:9005;height:25%;width:95%";
            comment3.innerText = comment_list[comment_liston[Number(id.replace("img", ""))][number3]];

            button1.innerText = "Last page";
            button2.innerText = "Next Page";
            button1.style.cssText = "float:left;position:relative;top:10%;left:50%;background-color:pink"
            button2.style.cssText = "float:right;position:relative;top:10%;background-color:pink"

            //the style of picture pop-up window
            pic.style.overflowY = 'scroll';
            pic.style.overflowX = 'hidden';
            pic.style.backgroundColor = "wheat";
            pic.style.width = "auto";
            pic.style.height = "80%"
            pic.style.top = "10%";
            pic.style.position = "fixed";
            pic.style.zIndex = 9000;
            pic.appendChild(innerimg);
            comment.appendChild(comment1);
            comment.appendChild(comment2);
            comment.appendChild(comment3);
            comment.appendChild(button1);
            comment.appendChild(button2);
            pic.appendChild(comment);

            //the style of mask
            bgObj.style.cssText = "position:fixed;z-index: 8886;top: 0px;left: 0px;background: pink;filter: alpha(Opacity=50); -moz-opacity:0.5;opacity:0.5;";
            bgObj.style.width = '100%';
            bgObj.style.height = '120%';

            body.appendChild(bgObj);
            body.appendChild(pic);
//             if ((window.innerHeight * 0.8 / img_info[Number(id.replace("img", ""))].height * img_info[Number(id.replace("img", ""))].width + window.innerWidth * 0.175) / 2 > 0.45 * window.innerWidth) {
//                 var picleft = window.innerWidth / 12;
//             }
//             else {
                var picleft = window.innerWidth / 2 - (window.innerHeight * 0.8 / img_info[Number(id.replace("img", ""))].height * img_info[Number(id.replace("img", ""))].width + window.innerWidth * 0.175) / 2;
          /*  }*/
            pic.style.left = picleft + "px";

            innerimg.addEventListener("click", function () {
                body.removeChild(pic);
                body.removeChild(bgObj);
            }, false);
            bgObj.addEventListener("click", function () {
                body.removeChild(pic);
                body.removeChild(bgObj);
            }, false);

            button1.addEventListener("click", function () {
                if (number1 > 0) {
                    number1 = number1 - 3;
                    number2 = number1 - 3;
                    number3 = number1 - 3;
                    comment1.innerText = comment_list[comment_liston[Number(id.replace("img", ""))][number1]];
                    comment2.innerText = comment_list[comment_liston[Number(id.replace("img", ""))][number2]];
                    comment3.innerText = comment_list[comment_liston[Number(id.replace("img", ""))][number3]];
                }
                else {
                    alert("The First Page!");
                }
            }, false);

            button2.addEventListener("click", function () {
                if (number3 < 5) {
                    number1 = number1 + 3;
                    number2 = number1 + 3;
                    number3 = number1 + 3;
                    comment1.innerText = comment_list[comment_liston[Number(id.replace("img", ""))][number1]];
                    comment2.innerText = comment_list[comment_liston[Number(id.replace("img", ""))][number2]];
                    comment3.innerText = comment_list[comment_liston[Number(id.replace("img", ""))][number3]];
                }
                else
                {
                    alert("The Last Page!");
                }
            }, false);

        }, false);
    }
};


function addPicture() {
    function bindEvent(event, func) {
        if (window.addEventListener) {
            window.addEventListener(event, func, false);
        }
        else if (window.attachEvent) {
            window.attachEvent('on' + event, func);
        }
    }//add event, consider the browser type

    bindEvent('scroll', function (e) {
        var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
        var scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
        var clientH = document.documentElement.clientHeight || document.body.clientHeight;

        if ((scrollT >= (scrollH - clientH)) && (picturenum < MAX_PICTURE_NUM)) {
            var uilist = [document.getElementById("ui1")
                         , document.getElementById("ui2")
                         , document.getElementById("ui3")
                         , document.getElementById("ui4")];
            uilist.sort(function (a, b) {
                if (a.clientHeight > b.clientHeight) {
                    return 1;
                }
                else {
                    return -1;
                }
            });
            var li1, li2, li3;
            li1 = new createNewLi(uilist[0]);
            li2 = new createNewLi(uilist[1]);
            li3 = new createNewLi(uilist[2]);
        }

        var newdis = new getDistance();
    });

    function createNewLi(obj) {

        var li = document.createElement("li");
        li.setAttribute("class", "picture-item");
        li.setAttribute("id", "Li" + (picturenum + 1).toString());

        var picture = document.createElement("IMG");
        picture.src = "./img/mini" + (picturenum + 1) + ".jpg";
        picture.setAttribute("id", "img" + (picturenum + 1));
        var div = document.createElement("DIV");
        div.setAttribute("class", "info");
        div.setAttribute("style", "text-align:right");
        li.appendChild(picture);
        li.appendChild(div);
        picturenum++;

        obj.appendChild(li);

        var t = new clickevent(picture.getAttribute("id"));

        return li;
    };

};

function showLocation(position) {
    current_latitude = position.coords.latitude;
    current_longitude = position.coords.longitude;
};

function errorHandler(err) {
    if (err.code == 1) {
        alert("Error: Access is denied!");
    }

    else if (err.code == 2) {
        alert("Error: Position is unavailable!");
    }
};

function getLocation() {

    if (navigator.geolocation) {
        // timeout at 60000 milliseconds (60 seconds)
        var options = { timeout: 60000 };
        navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
    }

    else {
        alert("Sorry, browser does not support geolocation!");
    }
};



