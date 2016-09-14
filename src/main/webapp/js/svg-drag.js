import {SvgOptions} from './svg-options.js';
import {Global} from './global.js';
export class SvgDrag {

    constructor() {
        this.selectedElement = document.getElementById('bg');
        this.currentX = 0;
        this.currentY = 0;
        this.currentMatrix = 0;
        this.svgOptions = new SvgOptions();
    }

    selectElement(evt) {
        //this.selectedElement = evt.target;

        this.currentX = evt.clientX;
        this.currentY = evt.clientY;

        let attrsMap = this.svgOptions.getAttrs(this.selectedElement.getAttributeNS(null, "transform"));

        this.currentMatrix = attrsMap.get('translate');
        if(!this.currentMatrix){
            this.currentMatrix = [0,0];
        }

        for (var i = 0; i < this.currentMatrix.length; i++) {
            this.currentMatrix[i] = parseFloat(this.currentMatrix[i]);
        }

        this.selectedElement.setAttributeNS(null, "onmousemove", "moveElement(evt)");
        this.selectedElement.setAttributeNS(null, "onmouseout", "deselectElement(evt)");
        this.selectedElement.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
    }

    moveElement(evt) {
        let all_view = document.getElementById("all_view");
        let attrs = this.svgOptions.getAttrs(all_view.getAttribute('transform'));
        let s = attrs.get('scale');
        let sx = 1;
        let sy = 1;
        if(s){
            sx = s[0];
            sy = s[1];
        }

        let dx = evt.clientX - this.currentX;
        let dy = evt.clientY - this.currentY;
        // console.log(dx,dy)
        // if(Math.abs(dx) < 10 && Math.abs(dy) < 10){
        //     return ;
        // }
        // console.log('move');
        this.currentMatrix[0] += dx / (Global.get().pxRatio()[0] * sx);
        this.currentMatrix[1] += dy / (Global.get().pxRatio()[1] * sy);

        this.svgOptions.setTransform(this.selectedElement,'translate',this.currentMatrix,false);


        this.svgOptions.setTransform(all_view,'translate',this.currentMatrix,false);

        this.currentX = evt.clientX;
        this.currentY = evt.clientY;
    }

    deselectElement(evt) {
        var selectedElement = this.selectedElement;
        if (selectedElement != 0) {
            selectedElement.removeAttributeNS(null, "onmousemove");
            selectedElement.removeAttributeNS(null, "onmouseout");
            selectedElement.removeAttributeNS(null, "onmouseup");
            selectedElement = 0;
        }
    }
}

var svgDrag = new SvgDrag();
export var selectElement = function(evt) {
    svgDrag.selectElement(evt);
}
window.moveElement = function(evt) {
    svgDrag.moveElement(evt);
}
window.deselectElement = function(evt) {
    svgDrag.deselectElement(evt);
}