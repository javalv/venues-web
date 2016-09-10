export class SvgOptions{

    setTransformOptions(obj,optionsAttrs){
        this.setAttribute(obj,'transform',optionsAttrs.getAttrs());
    }

    setTransform(obj,key,value,cover){
        let attrstr = obj.getAttribute('transform');
        let attrs = this.getAttrs(attrstr);
        let optionsAttrs = SvgOptionsAttrs.createOptionsAttrs();

        if(cover || cover == true){
            optionsAttrs.addAttr(key,value);
        }else {
            if(attrs.size > 0){
                for (let attr of attrs.entries()) {
                    let _key = attr[0];
                    let _value = attr[1];
                    if(key == _key){
                        optionsAttrs.addAttr(key,value);
                    }else {
                        optionsAttrs.addAttr(_key,_value);
                    }
                }
            }else {
                optionsAttrs.addAttr(key,value);
            }
        }

        this.setAttribute(obj,'transform',optionsAttrs.getAttrs());

    }

    setAttribute(obj,attrName,attrs){
        let attrValue = "";
        for(let attr of attrs.entries()){
            let key = attr[0];
            let value = attr[1];
            let a = key + "(" + value[0] + "," + value[1] + ")" ;
            attrValue += a + " ";
        }

        obj.setAttribute(attrName,attrValue);
    }

    // setAttribute(obj,attrName,attrValue){
    //     obj.setAttribute(attrName,attrValue);
    // }

    //scale(1.5,1.5) translate(10.666666666666668,-11)
    getAttrs(attrStr){
        let attrs = new Map();
        if(!attrStr || attrStr == ''){
            return attrs;
        }

        let temps = attrStr.split(' ');
        temps.forEach(function (temp) {
            // console.log(temp);
            if(temp.startsWith('scale')){
                attrs.set('scale', temp.slice(6, -1).split(','));
            }
            if(temp.startsWith('translate')){
                attrs.set('translate',temp.slice(10, -1).split(','));
            }
        })

        return attrs;
    }


    getTransformAttrs(obj){
        let attrStr = obj.getAttribute('transform');
        return this.getAttrs(attrStr);
    }

    getTransformAttr(obj,key){
        let attrStr = obj.getAttribute('transform');
        let attrs = this.getAttrs(attrStr);
        if(!attrs){
            return null;
        }
        return attrs.get(key);
    }
}

export class SvgOptionsAttrs{
    constructor(){
        this.attrs = new Map();
    }

    static createOptionsAttrs(){
        return new SvgOptionsAttrs();
    }

    addAttr(key,value){
        this.attrs.set(key,value);
        return this;
    }

    getAttrs(){
        return this.attrs;
    }
}
