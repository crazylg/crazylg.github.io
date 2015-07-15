function addEventToAllpicture() {
    var imglist = document.getElementsByTagName("IMG");
    for (var i = 0; i < imglist.length; i++) {
        var t = new clickevent(imglist[i].id.toString());
    }
}

function clickevent(id) {
    var body = document.getElementsByTagName("BODY")[0];
    var bgObj = document.createElement("DIV");
    console.info(id);
    console.info(document.getElementById(id).src);
    if ((document.getElementById(id).src.indexOf("resource") == -1) && (document.getElementById(id).onclick == null)) {
        console.info(id);
        document.getElementById(id).addEventListener("click", function (e) {
            var pic = document.createElement("DIV");
            var comment = document.createElement("DIV");
            var innerimg = document.createElement("IMG");

            //the style of img
            innerimg.src = document.getElementById(id).src;
            var oriheight = innerimg.naturalHeight;
            var oriwidth = innerimg.naturalWidth;
            var imgheight = (window.innerHeight * 0.8).toString() + 'px';
            innerimg.style.cssText = "float:left;z-index:9010;" + "height:" + imgheight;

            //the style of comment
            var commentwidth = (window.innerWidth * 0.175).toString() + 'px';
            comment.style.cssText = "font-family:'Microsoft YaHei UI';text-indent: 2em;word-break: break-all;word-wrap:break-word;margin-left:10px;text-align:left;"
                                  + "float:left;position:relative;top:20px;"
                                  + "box-shadow:0 0 10px #888888;background: white;filter: alpha(Opacity=100); -moz-opacity:1;opacity:1; color: black;z-index:9005;width:"
                                  + commentwidth;
            comment.innerText = comment_list[Number(id.replace("img", ""))];

            //the style of picture pop-up window
            pic.style.overflowY = 'scroll';
            pic.style.overflowX = 'hidden';
            pic.style.backgroundColor = "wheat";
            pic.style.width = "auto";
            pic.style.height = "80%"
            pic.style.marginLeft = "auto";
            pic.style.marginRight = "auto";
            pic.style.top = "10%";
            pic.style.position = "fixed";
            pic.style.zIndex = 9000;
            var picleft = getMiddle();
            pic.style.left = picleft + "px";

            //get the style:left to make pic at middle
            function getMiddle() {
                var picwidth = window.innerHeight * 0.8 / oriheight * oriwidth;
                picwidth = picwidth + window.innerWidth * 0.175;
                var picleft = window.innerWidth / 2 - picwidth / 2;
                return picleft;
            };

            //the style of mask
            bgObj.style.cssText = "position:fixed;z-index: 8886;top: 0px;left: 0px;background: pink;filter: alpha(Opacity=50); -moz-opacity:0.5;opacity:0.5;";
            bgObj.style.width = '100%';
            bgObj.style.height = '120%';

            body.appendChild(bgObj);
            pic.appendChild(innerimg);
            pic.appendChild(comment);
            body.appendChild(pic);

            pic.addEventListener("click", function () {
                body.removeChild(pic);
                body.removeChild(bgObj);
            }, false);
            bgObj.addEventListener("click", function () {
                body.removeChild(pic);
                body.removeChild(bgObj);
            }, false);

        }, false);
    }
}

MAX_PICTURE_NUM = 50;
picturenum = 8;

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
        debugger;
        var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
        var scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
        var clientH = document.documentElement.clientHeight || document.body.clientHeight;

        if ((scrollT >= (scrollH - clientH)) && (picturenum < MAX_PICTURE_NUM)) {
            var uilist = [document.getElementById("ui1")
                         , document.getElementById("ui2")
                         , document.getElementById("ui3")
                         , document.getElementById("ui4")];
            console.info(uilist);
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
    });

    function createNewLi(obj) {
        var li = document.createElement("li");
        li.setAttribute("class", "picture-item");
        li.setAttribute("id", "Li" + (picturenum + 1).toString());

        var picture = document.createElement("IMG");
        picture.src = "./img/" + (picturenum + 1) + ".jpg";
        picture.setAttribute("id", "img" + (picturenum + 1));
        console.info(picture.src);
        console.info(picture.getAttribute("id"));
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



