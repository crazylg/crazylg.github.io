function sum() {
    var summ = 0;
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] != "string") {
            if (arguments[i] > 0 && arguments[i] < 1) {
                if (summ >= 1 || summ === 0) {
                    summ = summ + arguments[i];
                }
                else {//小于1的浮点数求和 求两个数的小数点后位数m，n，分别乘10^max{m,n}，相加之后再除以10^max{m,n}
                    var r1, r2, m, c;
                    try {
                        r1 = summ.toString().split(".")[1].length;
                    }
                    catch (e) {
                        r1 = 0;
                    }
                    try {
                        r2 = arguments[i].toString().split(".")[1].length;
                    }
                    catch (e) {
                        r2 = 0;
                    }
                    c = Math.abs(r1 - r2);
                    m = Math.pow(10, Math.max(r1, r2));
                    if (c > 0) {
                        var cm = Math.pow(10, c);
                        if (r1 > r2) {
                            summ = Number(summ.toString().replace(".", ""));
                            arguments[i] = Number(arguments[i].toString().replace(".", "")) * cm;
                        } else {
                            summ = Number(summ.toString().replace(".", "")) * cm;
                            arguments[i] = Number(arguments[i].toString().replace(".", ""));
                        }
                    } else {
                        summ = Number(summ.toString().replace(".", ""));
                        arguments[i] = Number(arguments[i].toString().replace(".", ""));
                    }
                    summ = (summ + arguments[i]) / m;
                }
            }
            else {
                summ = summ + arguments[i];
            }
        }
    }
    return summ;
}