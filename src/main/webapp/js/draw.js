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

//按某个中心点缩小
//transform="translate( -centerX*(factor-1), -centerY*(factor-1) ) scale(factor)"


    }

}
