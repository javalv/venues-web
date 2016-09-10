export class Global{

    constructor(){
        this.g = null;
    }

    static get(){
        if(!this.g){
            this.g = new Global();
        }
        return this.g;
    }

    syncSvgPx(viewSize){
        this.viewSize = viewSize;
        let h = document.getElementById("svg-view").clientHeight;
        this.h = h;
        let w = document.getElementById("svg-view").clientWidth;
        this.w = w;
    }

    //像素比例svg-view
    pxRatio(){
        return [
            this.w * 1.0 / this.viewSize.x,
            this.h * 1.0 / this.viewSize.y
        ]

    }

    getViewSize(){
        return this.viewSize;
    }

}
