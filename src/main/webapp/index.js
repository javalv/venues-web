import {SeatingChart} from './js/seating-chart.js';
import {selectElement} from './js/svg-drag.js';
import {Draw} from './js/draw.js';
import {Global} from './js/global.js';

let g = Global.get();
g.syncSvgPx({x:800,y:600});

let chart = new SeatingChart();
chart.createOutline();
chart.render();

let draw = new Draw();

var doFocus = function (obj,value) {
    var vSize = g.getViewSize();
    chart.focus(obj, value, vSize);
}

var doScale = function (value) {
    var vSize = g.getViewSize();
    chart.scale( value, vSize);
}

document.getElementById("focusBtn").onclick = function () {
    //var value = 8;
    //var obj = document.getElementById('i1763');
    //doFocus (obj,value);
    var vSize = g.getViewSize();
    draw.scale(selected,vSize,0.65);
}

document.getElementById("zoomOutBtn").onclick = function () {
    var value = 1.25;
    doScale (value);
}

document.getElementById("zoomInBtn").onclick = function () {
    var value = 0.8;
    doScale (value);
}

document.body.onmousewheel = function(e) {
    let value;
    if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
        if (e.wheelDelta > 0) { //当滑轮向上滚动时
            value = 1.25;
        }
        if (e.wheelDelta < 0) { //当滑轮向下滚动时
            value = 0.8;
        }
    } else if (e.detail) {  //Firefox滑轮事件
        if (e.detail> 0) { //当滑轮向上滚动时
            value = 1.25;
        }
        if (e.detail< 0) { //当滑轮向下滚动时
            value = 0.8;
        }
    }
    if(value){
        doScale (value);
    }

}


document.getElementById("bg").onmousedown = function (evt) {
    selectElement(evt);
}

let r = 0;
var rotateValue = function (value) {
    if(selected){
        r = r + value;
        var box = selected.getBBox();
        var x = box.x + box.width / 2;
        var y = box.y + box.height / 2;
        draw.rotate(selected,r, [x,y]);
    }
}
document.getElementById("rotateAddBtn").onclick= function (evt) {
    rotateValue(5);
}
document.getElementById("rotateSubBtn").onclick= function (evt) {
    rotateValue(-5);
}


let selected;
//选中
window.onSelected= function (obj) {
   selected = obj;
}




