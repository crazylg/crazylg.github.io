function myAlert() {
    var AlertStyle = {
        content: "There is no content declared.",
        title: "My Alert",
        draggable: true,

        closeKey: 27,

        btnOk: 'Yes',
        btnNo: 'No',
        funcOk: function () {

        },
        funcNo: function () {

        }
    };

    var body = document.getElementsByTagName("BODY")[0];

    var bgObj = document.createElement("DIV");

    //init content or draggable
    this.init = function (obj) {
        if (obj.content) {
            AlertStyle.content = obj.content;
        }
        if (obj.draggable) {
            AlertStyle.draggable = obj.draggable;
        }
        if (obj.closeKey) {
            AlertStyle.closeKey = obj.closeKey;
        }
    };

    //load the window
    this.load = function (){
        //to create the "body" of the window alerted
        var alertWinBody = document.createElement("DIV");
        alertWinBody.style.cssText = "position:fixed;z-index:8888;width:300px; height:auto; overflow:hidden;background-color:gray; border:solid 1px white;padding-bottom:10px;font-family:'Microsoft Himalaya'";
        alertWinBody.style.top = '300px'; alertWinBody.style.left = '40%';

        //the background of title
        var titbg = document.createElement("DIV");
        titbg.style.cssText = "height;30px; line-height:30px; font-size:1.5em;background-color:black;color:white;";

        //the title of the window
        var titDiv = document.createElement("DIV");
        titDiv.style.cssText = "float:left; width:80%;margin-left:5px;";
        titDiv.innerHTML = AlertStyle.title;

        //add X to the window
        var cross = document.createElement("DIV");
        cross.style.cssText = "float:right; cursor:pointer;margin-right:5px;";
        cross.innerHTML = 'X';
        var clearDiv = document.createElement("DIV");
        clearDiv.style.cssText = "clear:both";

        //content
        var contentDiv = document.createElement("DIV");
        contentDiv.style.cssText = "height:auto; overflow:hidden; line-height:24px;padding:0px 10px 10px;text-align:center;margin-top:10px;font-size:1.8em";
        contentDiv.innerHTML = AlertStyle.content;

        //add ok button
        var okBtn = document.createElement("BUTTON");
        okBtn.style.cssText = "float:right;top:80%;width:50px; margin-right:10px;cursor:pointer ";
        okBtn.innerHTML = AlertStyle.btnOk;

        //add no button
        var noBtn = document.createElement("BUTTON");
        noBtn.style.cssText = "float:right; width:50px;cursor:pointer;margin-right: 10px;";
        noBtn.innerHTML = AlertStyle.btnNo;

        //get complete window
        titbg.appendChild(titDiv);
        titbg.appendChild(cross);
        titbg.appendChild(clearDiv);
        alertWinBody.appendChild(titbg);
        alertWinBody.appendChild(contentDiv);
        alertWinBody.appendChild(okBtn);
        alertWinBody.appendChild(noBtn);
        body.appendChild(alertWinBody);

        //add button event
        cross.onclick = function () {
            body.removeChild(alertWinBody);
            body.removeChild(bgObj);
        };
        okBtn.onclick = function () {
            AlertStyle.funcOk();
            body.removeChild(alertWinBody);
            body.removeChild(bgObj);
        };
        noBtn.onclick = function () {
            AlertStyle.funcNo();
            body.removeChild(alertWinBody);
            body.removeChild(bgObj);
        };

        document.onkeyup = function (e) {

            e = e || window.event;

            var code = e.which || e.keyCode;
            console.info(code);
            if (code === AlertStyle.closeKey) {

                // TODO 
                body.removeChild(alertWinBody);
                body.removeChild(bgObj);
            }

        };

        var fflag = false;
        var dx = dy = 0;

        alertWinBody.addEventListener("mousedown", function (event) {
            fflag = true;
            mx = event.clientX;
            my = event.clientY;
            if (alertWinBody.style.left.indexOf("%") > 0) {
                dx = (parseFloat(alertWinBody.style.left.replace("%", "")) / 100) * document.body.clientWidth;
            }
            else {
                dx = parseFloat(alertWinBody.style.left.replace("px", ""));
            }
            dy = parseFloat(alertWinBody.style.top.replace("px", ""));
            alertWinBody.style.left = Math.floor(dx) + "px";
            alertWinBody.style.top = Math.floor(dy) + "px";
            if (AlertStyle.draggable === true && flag) {
            }   
        }, false);  
        alertWinBody.addEventListener("mousemove", function (event) {
            var ddx = dx + event.clientX - mx;
            var ddy = dy + event.clientY - my;
            if (fflag && AlertStyle.draggable) {
                alertWinBody.style.left = Math.floor(ddx) + "px";
                alertWinBody.style.top = Math.floor(ddy) + "px";
            }
        }, false);
        alertWinBody.addEventListener("mouseup", function (event) {
            fflag = false;
        }, false);
    }

    //to lock other area.
    this.lock = function () {
        bgObj.style.cssText = "position:fixed;z-index: 8886;top: 0px;left: 0px;background: #FFFFFF;filter: alpha(Opacity=30); -moz-opacity:0.30;opacity:0.30;";
        bgObj.style.width = '100%';
        bgObj.style.height = '120%';
        body.appendChild(bgObj);
    }
}

function Alert() {
    obj = new myAlert();
    obj.init({ content: "THSS13  Gen Li", closeKey: 27});
    obj.load();
    obj.lock();
}