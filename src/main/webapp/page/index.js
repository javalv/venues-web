import {SeatingChart} from './seating-chart.js';
import {selectElement} from './svg-drag.js';
import {Global} from './global.js';

let g = Global.get();
g.syncSvgPx({x:800,y:600});

let chart = new SeatingChart();
chart.createOutline();
chart.render();


var doFocus = function (obj,value) {
    var vSize = g.getViewSize();
    chart.focus(obj, value, vSize);
}

var doScale = function (value) {
    var vSize = g.getViewSize();
    chart.scale( value, vSize);
}

document.getElementById("focusBtn").onclick = function () {
    var value = 8;
    var obj = document.getElementById('i1763');
    doFocus (obj,value);
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


