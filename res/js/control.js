window.onkeydown = function(event) {
    switch (event.keyCode) {
        case 90:
            myplan.rotateLeft = true;
            break;;
        case 67:
            myplan.rotateRight = true;
            break;
        case 37:
            myplan.toLeft = true;
            break;
        case 38:
            myplan.toTop = true;
            break;
        case 39:
            myplan.toRight = true;
            break;
        case 40:
            myplan.toBottom = true;
            break;
        default:
            break;
    }
}
window.onkeyup = function(event) {
    switch (event.keyCode) {
        case 90:
            myplan.rotateLeft = false;
            break;;
        case 67:
            myplan.rotateRight = false;
            break;
        case 37:
            myplan.toLeft = false;
            break;
        case 38:
            myplan.toTop = false;
            break;
        case 39:
            myplan.toRight = false;
            break;
        case 40:
            myplan.toBottom = false;
            break;
        default:
            break;
    }
}
document.getElementById("god").onclick = function() {
    if (myplan) {
        myplan.god = true;
        myplan.fireLevel = 4;
        myplan.firePerFrame = 10;
    }
}
document.getElementById("verygod").onclick = function() {
    if (myplan) {
        myplan.god = true;
        myplan.fireLevel = 10;
        myplan.firePerFrame = 10;
    }
}
document.getElementById("pretygod").onclick = function() {
    if (myplan) {
        myplan.god = true;
        myplan.fireLevel = 40;
        myplan.firePerFrame = 50;
    }
}
document.getElementById("nogod").onclick = function() {
    if (myplan) {
        myplan.god = true;
        myplan.fireLevel = 40;
        myplan.firePerFrame = 5;
    }
}