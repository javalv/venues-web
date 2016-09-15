var SVG_NS = "http://www.w3.org/2000/svg";
var XLINK_NS = "http://www.w3.org/1999/xlink";
function create(){
    var seat = document.getElementById('seat');
    return this.createUse(seat);
}

function createUse(obj) {
    var _use = document.createElementNS(SVG_NS, 'use');
    _use.setAttributeNS(XLINK_NS, 'xlink:href', '#' + obj.id);
    return _use;
}

function httpGet(url,callback) {
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
    function handler() {
        //必须,必须等待状态返回
        if(this.readyState==4){
            if (this.status === 200) {
                callback(this.response);
            } else {
            }
        }
    }
}

function render(){
    var url = "http://" + location.host + "/venues/getAreas";
    var count = 60000;
    //setTimeout(function () {
    //    document.getElementById("all_view").addEventListener('click', function (evt) {
    //        zOut();
    //    })
    //},1000);

    httpGet(url,function (data1) {
        data1.forEach(function (value) {

            var rc = value.rc.split("|").join(" ");
            var polygon = document.createElementNS(SVG_NS, "polygon");
            polygon.setAttribute("points", rc);
            polygon.setAttribute("id",value.standId);
            polygon.addEventListener('click',function(){
                zOut(polygon)

            });
            document.getElementById("all_view").appendChild(polygon);

            url = "http://" + location.host + "/venues/getSeats?standId=" + value.standId;
            httpGet(url,function(data) { //resolve的回调
                if(!data){
                    return;
                }

                data.forEach(function (o, index) {

                    var obj = create();

                    var x = o[0];
                    var y = o[1];
                    obj.setAttribute('x', x);
                    obj.setAttribute('y', y);
                    if(count-->0){

                        document.getElementById("all_view").appendChild(obj);

                    }
                })
            });
        })
    })

}

render();


function left() {
    var ts = document.getElementById("all_view").getAttribute('transform').slice(10, -1).split(',');
    ts[0] = 10.0 + ts[0] * 1.0 ;
    ts[1] = 10.0 + ts[1] * 1.0 ;
    document.getElementById("all_view").setAttribute('transform','translate('+ts[1]+','+ts[1]+')');
}
function right() {
    var ts = document.getElementById("all_view").getAttribute('transform').slice(10, -1).split(',');
    ts[0] = ts[0] * 1.0 - 10;
    ts[1] = ts[1] * 1.0 - 10;
    document.getElementById("all_view").setAttribute('transform','translate('+ts[1]+','+ts[1]+')');
}

function zoomOut() {
    var ts = document.getElementById("all_view").getAttribute('transform').slice(6, -1).split(',');
    ts[0] = ts[0] * 1.25 ;
    ts[1] = ts[1] * 1.25 ;
    document.getElementById("all_view").setAttribute('transform','scale('+ts[1]+','+ts[1]+')');
}
function zoomIn() {
    var ts = document.getElementById("all_view").getAttribute('transform').slice(6, -1).split(',');
    ts[0] = ts[0] * 0.8 ;
    ts[1] = ts[1] * 0.8 ;
    document.getElementById("all_view").setAttribute('transform','scale('+ts[1]+','+ts[1]+')');
}


//drap drop
function allowDrop(ev)
{
    ev.preventDefault();
}

function drag(ev)
{
    ev.dataTransfer.setData("Text",ev.target.id);
    //document.getElementById("svg-view").style.display = 'none';
}

function drop(ev)
{
    ev.preventDefault();
    var data=ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(data));
}


var scale = 1.0;
function zOut(obj){
    var value = 3.0;
    scale = scale * value;
    var svg_view = document.getElementById("svg-view");
    var width = svg_view.getAttribute("width");
    var height = svg_view.getAttribute("height");

    width = width * value;
    height = height * value;
    svg_view.setAttribute("width" , width);
    svg_view.setAttribute("height" , height);


    var box = obj.getBBox();
    var x = (box.x ) * scale;
    var y = (box.y ) * scale;
    console.log(width,height,x,y);

    document.getElementById('scroll-div').scrollTop = y;
    document.getElementById('scroll-div').scrollLeft = x;
}
