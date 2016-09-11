import {SvgOptions,SvgOptionsAttrs} from './svg-options.js'
export class Draw {

    constructor() {
        this.svgOptions = new SvgOptions();

    }


    rotate(obj,value, center) {
        this.svgOptions.setTransform(obj,'rotate',[value,center[0],center[1]]);
    }

    scale(obj,vSize,value){
        //value = 0.5;
        var box = obj.getBBox();
        var x = box.x + box.width / 2;
        var y = box.y + box.height / 2;

        let v_size_x = vSize.x;
        let v_size_y = vSize.y;

        //v_size_x / 2 /value
        let scale_x = x * (1 - value);
        let scale_y = y * (1 - value) ;

        let optionsAttrs = SvgOptionsAttrs.createOptionsAttrs();
        optionsAttrs.addAttr('translate',[scale_x,scale_y])
            .addAttr('scale',[value,value])

        this.svgOptions.setTransformOptions(obj,optionsAttrs);


//transform="translate( -centerX*(factor-1), -centerY*(factor-1) ) scale(factor)"



        //value = 0.5;
        //let optionsAttrs = SvgOptionsAttrs.createOptionsAttrs();
        //
        //let v_size_x = vSize.x;
        //let v_size_y = vSize.y;
        //
        //let attrs = this.svgOptions.getTransformAttrs(obj);
        //
        //let tx = 0;
        //let ty = 0;
        //let t = attrs.get('translate');
        //if(t){
        //    tx = t[0];
        //    ty = t[1];
        //}
        //
        //var scaleAttr = this.svgOptions.getTransformAttr(obj,'scale');
        //if(!scaleAttr){
        //    scaleAttr = [1,1];
        //}
        //
        ////先计算想要缩放的中心点在视窗中的位置
        //let center_x = v_size_x / (2.0 * scaleAttr[0]) - tx;
        //let center_y = v_size_y / (2.0 * scaleAttr[0]) - ty;
        //
        //let scaleValue = scaleAttr[0] * value;
        //
        //let scale_x = v_size_x / (2.0 * scaleValue) - center_x;
        //let scale_y = v_size_y / (2.0 * scaleValue) - center_y ;
        //
        //optionsAttrs.addAttr('scale',[scaleValue,scaleValue])
        //    .addAttr('translate',[scale_x,scale_y]);
        //
        //this.svgOptions.setTransformOptions(obj,optionsAttrs);
    }

}
