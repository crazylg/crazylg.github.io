//global variables-------------------------------------------------------------------------------------------------------------------------------------------------
//map's size
var width = 60;
var height = 60;

//map
var map = new Array();

//start percent of cell
var start_percent_of_cell = 0.5;

//manually or not
var manually_flag = false;

//start and manually button-----------------------------------------------------------------------------------------------------------------------------------------
function start() {
    if (!manually_flag) {
        $('#btn_start').addClass('disabled');
        start_percent_of_cell = $('#start_percent_of_cell').val();
        randomData(map, start_percent_of_cell);
        draw_map_calculated(map);
        setInterval("refresh()", 300);
    }
    else {
        draw_map_calculated(map);
        setInterval("refresh()", 300);
    }
};

function manually() {
    manually_flag = true;
    for (var i = 0; i < width; i++){
        map[i] = new Array();
        for (var j = 0; j < height; j++)
            map[i][j] = 0;
    }
    $('#btn_manually').addClass('disabled');
};

/*click the cell*/
function bind_click() {
    $('.cell').bind('click', function () {
        if (manually_flag) {
            //get column and row
            var id = $(this).attr('id');
            var x = 0, y = 0;
            var num = 0;
            for (var i = 5; i < id.length; i++) {
                if (id[i] >= '0' && id[i] <= '9') {
                    if (num == 0)
                        x = x * 10 + parseInt(id[i]);
                    else if (num == 1)
                        y = y * 10 + parseInt(id[i]);
                }
                else {
                    num++;
                }
            }
            if (map[x][y] == 0) {
                map[x][y] = 1;
                $(this).css("background-color", "black");
            }
            else {
                map[x][y] = 0;
                $(this).css("background-color", "silver");
            }
        }
    });
};


//refresh------------------------------------------------------------------------------------------------------------------------------------------------------------
function refresh() {
    updataMatrix(map);
    draw_map_calculated(map);
};

//calculating function------------------------------------------------------------------------------------------------------------------------------------------------
function randomData(map, pblt) {
    for (var i = 0; i < width; i++) {
        map[i] = new Array();
        for (var j = 0; j < height; j++) {
            if (Math.random() < pblt) {
                map[i][j] = 1;
            }
            else {
                map[i][j] = 0;
            }
        }
    }
};

function getRoot(m, x, y) {
    if ((x == -1) || (x == width)) {
        return 0
    }
    if ((y == -1) || (y == height)) {
        return 0
    }
    return m[x][y]
}

function countBeside(m, x, y) {
    var result = 0
    for (var i = x - 1; i <= x + 1; i++) {
        for (var j = y - 1; j <= y + 1; j++) {
            result = result + getRoot(m, i, j)
        }
    }
    result = result - m[x][y]
    return result
};

function updataMatrix(x) {
    y = new Array();
    var root
    for (var i = 0; i < width; i++) {
        y[i] = new Array();
        for (var j = 0; j < height; j++) {
            root = countBeside(x, i, j)

            if (root == 2) {
                y[i][j] = x[i][j];
            }
            else if (root == 3) {
                y[i][j] = 1;
            }
            else {
                y[i][j] = 0;
            }
        }
    }
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            x[i][j] = y[i][j];
        }
    }
};

//draw function-------------------------------------------------------------------------------------------------------------------------------------------------------
//original map 60*60
function draw_map_original() {
    var div_map = $('#div_map');
    for (var i = 0; i < 60; i++) {
        for (var j = 0; j < 60; j++) {
            var cell = $('<div></div>');
            cell.attr('style', 'position:absolute;float:left;width:10px;height:10px;' + 'top:' + i * 10 + 'px' + ';' + 'left:' + j * 10 + 'px' + ';' + 'border:1px solid black;background-color:silver')
            cell.attr('id', 'cell_' + i + '_' + j);
            cell.addClass('cell');
            div_map.append(cell);
        };
    };
};

//draw map calculated
function draw_map_calculated(map) {
    for (var i = 0; i < 60; i++) {
        for (var j = 0; j < 60; j++) {
            if (map[i][j] == 1) {
                $('#cell_' + i + '_' + j).css("background-color", "black");
            }
            else {
                $('#cell_' + i + '_' + j).css("background-color", "silver");
            }
        };
    };
};