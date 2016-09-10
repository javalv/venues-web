import {DataService} from "./dataService.js";
import {Seat} from './seat.js';
import {OutLine} from './out-line.js';
import {SvgOptions,SvgOptionsAttrs} from './svg-options.js';
import {Global} from './global.js'
export class SeatingChart {

    constructor() {
        this.service = new DataService();
        this.seatFactory = new Seat();
        this.outLineFactory = new OutLine();
        this.svgOptions = new SvgOptions();
    }

    render() {
        let seatFactory = this.seatFactory;
        var promise = this.service.getSeats();
        let all_view = document.getElementById('all_view');
        var obj;
        promise.then(function(data) { //resolve的回调
            data.forEach(function (o, index) {

                obj = seatFactory.create();

                let x = o[0];
                let y = o[1];
                obj.setAttribute('x', x);
                obj.setAttribute('y', y);
                all_view.appendChild(obj);
            })
        }, function(error) {  //reject的回调
            console.error('出错了', error);
        });

    }

    /**
     * 按缩放比例居中，根据坐标点
     // * @param center 中心点坐标
     * @param obj 选中对象
     * @param value 缩放大小值
     * @param vSize viewBox大小
     // * @param obj 缩放对象
     */
    focus(obj,value, vSize) {

        var box = obj.getBBox();
        var x = box.x + box.width / 2;
        var y = box.y + box.height / 2;

        let v_size_x = vSize.x;
        let v_size_y = vSize.y;

        //v_size_x / 2 /value
        let scale_x = v_size_x / (2.0 * value) - x;
        let scale_y = v_size_y / (2.0 * value) - y;

        let all_view = document.getElementById("all_view");
        let optionsAttrs = SvgOptionsAttrs.createOptionsAttrs();
        optionsAttrs.addAttr('scale',[value,value])
            .addAttr('translate',[scale_x,scale_y]);
        this.svgOptions.setTransformOptions(all_view,optionsAttrs);

        let bg = document.getElementById("bg");
        this.svgOptions.setTransformOptions(bg,optionsAttrs);

    }

    scale(value,vSize){
        let obj = document.getElementById("all_view");
        let optionsAttrs = SvgOptionsAttrs.createOptionsAttrs();

        let v_size_x = vSize.x;
        let v_size_y = vSize.y;

        let attrs = this.svgOptions.getTransformAttrs(obj);

        let tx = 0;
        let ty = 0;
        let t = attrs.get('translate');
        if(t){
            tx = t[0];
            ty = t[1];
        }

        var scaleAttr = this.svgOptions.getTransformAttr(obj,'scale');
        if(!scaleAttr){
            scaleAttr = [1,1];
        }

        //先计算想要缩放的中心点在视窗中的位置
        let center_x = v_size_x / (2.0 * scaleAttr[0]) - tx;
        let center_y = v_size_y / (2.0 * scaleAttr[0]) - ty;

        let scaleValue = scaleAttr[0] * value;

        let scale_x = v_size_x / (2.0 * scaleValue) - center_x;
        let scale_y = v_size_y / (2.0 * scaleValue) - center_y ;

        optionsAttrs.addAttr('scale',[scaleValue,scaleValue])
            .addAttr('translate',[scale_x,scale_y]);

        this.svgOptions.setTransformOptions(obj,optionsAttrs);
        let bg = document.getElementById("bg");
        this.svgOptions.setTransformOptions(bg,optionsAttrs);
    }

    //创建轮廓
    createOutline(){

        let outLineFactory = this.outLineFactory;
        var promise = this.service.getOutlineData();
        var that = this;
        promise.then(function(data) { //resolve的回调
            data.forEach(function (value,index) {
                let polygon = outLineFactory.create(value);
                polygon.addEventListener('click',function(){
                    var value = 3;
                    var vSize = Global.get().getViewSize();
                    that.focus(polygon, value, vSize);
                });
                var bg = document.getElementById('bg');
                bg.appendChild(polygon);

                //小图
                let polygon1 = outLineFactory.create(value);
                polygon1.addEventListener('click',function(){
                    var value = 3;
                    var vSize = Global.get().getViewSize();
                    that.focus(polygon, value, vSize);
                });
                var nav = document.getElementById('nav');
                nav.appendChild(polygon1);
            })
        }, function(error) {  //reject的回调
            console.error('出错了', error);
        })



    }

}
