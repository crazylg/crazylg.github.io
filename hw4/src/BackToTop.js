function TOP() {
    var btnID = "_BackToTop";
    
    function $() {
        return document.getElementById(arguments[0]);
    }

    function GetScrollTop() {
        return ('pageYOffset' in window) ? window.pageYOffset //take the browser type in consideration
            : document.compatMode === "BackCompat"            // if compatMode === BackCompat, use document.body.***
            && document.body.scrollTop                        // else, use document.documentElement.***
            || document.documentElement.scrollTop;
    }//get the height of scroll

    function bindEvent(event, func) {
        if (window.addEventListener) {
            window.addEventListener(event, func, false);
        }
        else if (window.attachEvent) {
            window.attachEvent('on' + event, func);
        }
    }//add event, consider the browser type

    var css = 'position:fixed;cursor:pointer;display:none;opacity:50;width:75px;height:75px;opacity:0.5;';
    this.init = function () {
        if (arguments.length != 2) {
            css = css + 'right:5%;bottom:5%;';
        }
        else if (arguments.length === 2) {
            if (typeof arguments[0] === "number" && typeof arguments[1] === "number") {
                css = css + 'left:' + arguments[0].toString() + 'px;top:' + arguments[1].toString() + 'px;';
            }
            else if (typeof arguments[0] === "boolean" && typeof arguments[1] === "boolean") {//init(isAtLeft, isAtTop)  boolean:isAt
                if (arguments[0] === true) {
                    if (arguments[1] === true) {//LeftTop
                        css = css + 'right:95%;bottom:90%;';
                    }
                    else {//LeftBottom
                        css = css + 'right:95%;bottom:5%;';
                    }
                }
                else {
                    if (arguments[1] === true) {//RightTop
                        css = css + 'right:5%;bottom:90%;';
                    }
                    else {//RightBottom
                        css = css + 'right:5%;bottom:5%;';
                    }
                }
            }
            else {
                css = css + 'right:5%;bottom:5%;';
            }
        }
    }

    bindEvent('load', function () {
        //the style of button
        

        el = document.createElement('img');
        el.src = 'resource/1.png';
        el.id = btnID;
        el.style.cssText = css;
        document.body.appendChild(el);

        //add click event to button
        el.onclick = function () {
            (function () {
                var top = GetScrollTop();
                if (top > 0) {
                    window.scrollTo(0, top / 1.1);
                    setTimeout(arguments.callee, 10);//achieve animation by setting time
                    if (top < 5) {
                        window.scrollTo(0, 0)
                    }
                }
            })();
        };

        

        el.onmouseover = function () {
            document.getElementById(btnID).style.opacity = 1;
         };
        el.onmouseout = function () {
            document.getElementById(btnID).style.opacity = 0.5;
         };

        //if the scroll is at top, the button will hide
        bindEvent('scroll', function () {
            var top = GetScrollTop(), display = 'none';

            if (top > 0) {
                display = 'block';
            }
            if (document.getElementById(btnID)) {
                document.getElementById(btnID).style.display = display;
            }
        });
    });


    function backtotop() {
        (function () {
            var top = GetScrollTop();
            if (top > 0) {
                window.scrollTo(0, top / 1.1)
                setTimeout(arguments.callee, 10);//achieve animation by setting time
            }
        })();
    };
    // Press key T to get back to the top
    function keyUp(e) {
        if (navigator.appName == "Microsoft Internet Explorer") {
            var keycode = event.keyCode;
            var realkey = String.fromCharCode(event.keyCode);
        } else {
            var keycode = e.which;
            var realkey = String.fromCharCode(e.which);
        }
        if (realkey === 'T'){
            backtotop();
        }
    }

    document.onkeydown = keyUp;

};

