const SVG_NS = "http://www.w3.org/2000/svg";
export class OutLine {

    create(value) {
        var rc = value.rc.split("|").join(" ");
        var polygon = document.createElementNS(SVG_NS, "polygon");
        polygon.setAttribute("points", rc);
        polygon.setAttribute("id",value.standId);
        return polygon;
    }
}
