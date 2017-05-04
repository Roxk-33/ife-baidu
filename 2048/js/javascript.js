/**
 * Created by hao on 2017/2/15.
 */
/*
记录棋盘是否有数字
 */
var checkerboard = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var aDiv = $(".game div");
//移动方向
var yDic = false;
// 左右/上下 移动区别
var lowTobig = true;
/*
生成数字随机出现的块
 */
function randomLoc() {

    var loc = parseInt(Math.random()*15);
    while(checkerboard[loc]){
        loc = parseInt(Math.random()*15);
    }
    checkerboard[loc] = 1;
    showNum(loc)
}
/*
生成方块
 */
function showNum(loc) {
    $(aDiv[loc]).addClass("hasNum lev1").html("2")
}
/*
 获得块中的值
 -1表示块中无值
 */
function getBlockval(aBlock) {
    var aVal = [];
    for(var i = 0 ; i < aBlock.length;i++){
        $(aBlock[i]).hasClass("hasNum") && (aVal.push(parseInt(aBlock[i].innerHTML))) || aVal.push(-1)
    }
    return aVal;
}
/*
让块向指定方向靠拢
 */
function near(oVal) {

    if(lowTobig){
        for (var i = oVal.length -1 ; i > 0; i--) {
            if (oVal[i - 1] !== -1 && oVal[i] === -1) {
                oVal[i] = oVal[i -1];
                oVal[i - 1] = -1;
                for(var ii = i + 1;ii < oVal.length;ii++) {
                    if (oVal[ii] === -1) {
                        oVal[ii] = oVal[ii - 1];
                        oVal[ii - 1] = -1;
                    }
                }

            }
        }
    }
    else {
        for (var i = 1, len = oVal.length; i < len; i++) {

            if (oVal[i] !== -1 && oVal[i -1] === -1) {
                oVal[i - 1] = oVal[i];
                oVal[i] = -1;
                for (var ii = i - 1; ii >= 0; ii--) {
                    if (oVal[ii] === -1) {
                        oVal[ii] = oVal[ii + 1];
                        oVal[ii + 1] = -1;
                    }
                }

            }

        }
    }
    return oVal;
}
/*
计算值
 */
function Cal(oVal) {
    if (lowTobig) {
        for (var i = oVal.length - 1; i > 0; i--) {
            if (oVal[i] == oVal[i - 1] && oVal[i] !== -1) {
                oVal[i] = oVal[i] * 2;
                oVal[i - 1] = -1;
            }
        }
    }
    else {
        for (var i = 1, len = oVal.length; i < len; i++) {
            if (oVal[i] == oVal[i - 1] && oVal[i] !== -1) {
                oVal[i - 1] = oVal[i - 1] * 2;
                oVal[i] = -1;
            }
        }
    }

    return  near(oVal);
}
/*
先将同一方向的块靠拢，再计算符合条件的块相加的值，再让块靠拢
 */
function Sortval(aVal) {
    aVal.forEach(function (item) {
        item = near(item)
        item = Cal(item);
    })
    // console.log(checkerboard)
    renderBlock(aVal);
}
/*
重新渲染
 */
function renderBlock(aResult) {
    for(var j  = 0; j < aResult.length;j++) {
        var oResult = aResult[j];
        //所需改变方块的索引
        var index = 0;
        for (var i = 0, len = oResult.length; i < len; i++) {
            //移动方向是垂直时
            if(yDic) {
                index = i * 4 + j ;
            }
            //移动方向是水平时
            else index = j * 4 + i ;
            if(oResult[i] === -1) {
                $(aDiv[index]).html("").removeClass("hasNum lev1 lev2 lev3");
                checkerboard[index] = 0;
            }
            else {
                $(aDiv[index]).html(oResult[i]).addClass("hasNum lev1")
                if (parseInt(oResult[i]) > 8) $(aDiv[index]).addClass("lev2");
                if (parseInt(oResult[i]) > 64) $(aDiv[index]).addClass("lev3");
                else $(aDiv[index]).addClass("lev1");
                checkerboard[index] = 1;

            }
        }
    }
    // console.log(checkerboard)
    if(gameOver() && gameWin()) {
        randomLoc();
    }
}
/*
dir 为移动的方向
 */
function move(dir) {
    var aVal = [];
    //向左，向上
    if(dir == 38 || dir == 37){
        lowTobig = false;
    }
    else lowTobig = true;
    //垂直方向
    if(dir == 38 || dir == 40){
        yDic = true;
       var col_1 = getBlockval($(".col-1")),
           col_2 = getBlockval($(".col-2")),
           col_3 = getBlockval($(".col-3")),
           col_4 = getBlockval($(".col-4"));
        // aVal.push(col_1)
        aVal.push(col_1,col_2,col_3,col_4)
    }
    //水平方向
    else if(dir == 37 || dir == 39){
        yDic = false;
        var row_1 = getBlockval($(".row-1")),
            row_2 = getBlockval($(".row-2")),
            row_3 = getBlockval($(".row-3")),
            row_4 = getBlockval($(".row-4"));
        aVal.push(row_1,row_2,row_3,row_4)
    }
    else return;
    Sortval(aVal);
}
function gameOver() {
    var Score = 0;
    if(checkerboard.indexOf(0) === -1) {
        $("body").unbind();
        for(var i = 0 ; i < aDiv.length ;i++) {
            var value = parseInt(aDiv[i].innerHTML)
            if(value > Score) Score = value;
        }
        if(!gameOver())  alert("游戏结束,你的得分是:" + Score);
        return false;
    }
    return true;
}
function gameWin() {
    for(var i = 0 ; i < aDiv.length ;i++) {
        var value = 0;
        $(aDiv[i]).hasClass("hasNum") && (value = parseInt(aDiv[i].innerHTML))
        if(value === 2048){
            alert("Win!")
            $("body").unbind();
            return false;
        }
    }
    return true;
}
function init() {
    randomLoc();
    randomLoc();
    $("body").keyup(function (e) {
            move(e.keyCode)
        return false;
    })
    $("header div a").click(function () {
        $(".mark").css("display","block");
    })
}
$().ready(function () {
    init();
})
