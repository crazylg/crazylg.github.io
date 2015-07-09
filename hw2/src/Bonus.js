function Student(intname, intage, inthometown)
{
    var obj = new Object();
    obj.name = intname;
    obj.age = intage;
    obj.hometown = inthometown;
    return obj;
}

function TeacherAssistant(instudents)
{
    var teacherAssistant = new Object();
    teacherAssistant.students = instudents;
    teacherAssistant.search = (function (item) {
        if (typeof item === "number") {
            var result = [];
            var num = 0;
            for (var i = 0; i < instudents.length; i++) {
                if (instudents[i].age === item) {
                    result[num] = instudents[i];
                    num++;
                }
            }
            return result;
        }

        if (typeof item === "string") {
            var result = [];
            var num = 0;
            for (var i = 0; i < instudents.length; i++) {
                if (instudents[i].name === item) {
                    result[num] = instudents[i];
                    num++;
                }
            }
            return result;
        }

        if (typeof item === "object") {
            var result = [];
            var num = 0;
            for (var i = 0; i < instudents.length; i++) {
                var flag = false;
                if (item.hasOwnProperty(name) && item.name === instudents.name) {
                    result[num] = instudents[i];
                    flag = true;
                }
                if (item.hasOwnProperty(age) && item.age === instudents.age) {
                    result[num] = instudents[i];
                    flag = true;
                }
                if (item.hasOwnProperty(hometown) && item.hometown === instudents.hometown) {
                    result[num] = instudents[i];
                    flag = true;
                }
                if (flag) {
                    num++;
                }
            }
            return result;
        }
    });
    teacherAssistant.first = (function () {
        if (this.search.length != 0) {
            return this.search[0];
        }
        return null;
    })
}