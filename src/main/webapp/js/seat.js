const SVG_NS = "http://www.w3.org/2000/svg";
const XLINK_NS = "http://www.w3.org/1999/xlink";
export class Seat {

    createGroup(id){
        let g = document.createElementNS(SVG_NS, 'g');
        g.setAttribute('id','i' + id);
        g.setAttribute('fill','dodgerblue');
        return g;
    }

    create(){
        var seat = document.getElementById('seat');
        return this.createUse(seat);
    }

    createUse(obj) {
        var _use = document.createElementNS(SVG_NS, 'use');
        _use.setAttributeNS(XLINK_NS, 'xlink:href', '#' + obj.id);
        return _use;
    }

}

