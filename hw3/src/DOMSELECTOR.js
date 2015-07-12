function $(item) {
    if (item[0] === "#") {
        item = item.replace("#", "");
        var dom = document.getElementById(item);
        return dom;
    }
    else if (item[0] === ".") {
        item = item.replace(".", "");
        if (document.getElementsByClassName(item)) {
            var dom = document.getElementsByClassName(item);
            return dom;
        }
        else {
            var tagname = document.getElementsByTagName("*");
            var num = 0;
            var dom = [];
            for (var i = 0; i < tagname.length; i++) {
                if (tagname[i].className === item) {
                    dom[num] = tagname[i];
                    num++;
                }
            }
            return dom;
        }
    }
    else {
        var dom = document.getElementsByTagName(item);
        return dom;
    }
}