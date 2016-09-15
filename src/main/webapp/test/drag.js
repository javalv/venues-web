var selectedElement = 0;
var currentX = 0;
var currentY = 0;
var currentPoint = [];

function selectElement(evt) {
    selectedElement = evt.target;
    currentX = evt.clientX;
    currentY = evt.clientY;
    //currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');
    //
    //for(var i=0; i<currentMatrix.length; i++) {
    //    currentMatrix[i] = parseFloat(currentMatrix[i]);
    //}

    currentPoint[0] = document.getElementById('scroll-div').scrollTop;
    currentPoint[1] = document.getElementById('scroll-div').scrollLeft;

    selectedElement.setAttributeNS(null, "onmousemove", "moveElement(evt)");
    selectedElement.setAttributeNS(null, "onmouseout", "deselectElement(evt)");
    selectedElement.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
}

function moveElement(evt){
    dx = evt.clientX - currentX;
    dy = evt.clientY - currentY;
    //currentMatrix[4] += dx;
    //currentMatrix[5] += dy;
    //newMatrix = "matrix(" + currentMatrix.join(' ') + ")";
    //
    //selectedElement.setAttributeNS(null, "transform", newMatrix);

    currentPoint[0] += dx;
    currentPoint[1] += dy;

    document.getElementById('scroll-div').scrollTop = currentPoint[0];
    document.getElementById('scroll-div').scrollLeft = currentPoint[1];

    currentX = evt.clientX;
    currentY = evt.clientY;
}

function deselectElement(evt){
    if(selectedElement != 0){
        selectedElement.removeAttributeNS(null, "onmousemove");
        selectedElement.removeAttributeNS(null, "onmouseout");
        selectedElement.removeAttributeNS(null, "onmouseup");
        selectedElement = 0;
    }
}