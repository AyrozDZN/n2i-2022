let body = document.getElementsByTagName("body")[0];
let egg = document.getElementById('egg');
let eggDiv = document.getElementById('easteregg');
let valueX = 0;
let valueY = 0;
class Point{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Vector{
    constructor(p1, p2) {
        this.x = p2.x-p1.x;
        this.y = p2.y-p1.y;
    }

}

eggDiv.addEventListener('mouseover', (evt) => {
    egg.src="assets/capm.png";

    const screen = body.getBoundingClientRect()
    const screenMaxX = screen.right - eggDiv.offsetWidth;
    const screenMaxY = screen.bottom - eggDiv.offsetHeight;
    console.log(screenMaxX, screenMaxY)

    const box = eggDiv.getBoundingClientRect();
    const xCenter = (box.left + box.right) / 2;
    const yCenter = (box.top + box.bottom) / 2;

    const p1 = new Point(xCenter, yCenter);
    const p2 = new Point(evt.clientX-xCenter, evt.clientY-yCenter);
    let vect = new Vector(p1, p2);
    vect.x = -vect.x;
    vect.y = -vect.y;

    console.log(p1, p2, vect);
    valueX += vect.x - xCenter;
    valueY += vect.y - yCenter;


    if(valueX < -70)
        valueX = screenMaxX;
    if(valueY < -60)
        valueY = screenMaxY;
    if(valueX > screenMaxX + 120)
        valueX = 0;
    if(valueY > screenMaxY + 100)
        valueY = 0;

    if (valueX == screenMaxX || valueX == 0 || valueY == screenMaxY || valueY == 0) {
        eggDiv.style.transition = 0;
        eggDiv.style.transform = "translate("+ valueX + "px" + "," + valueY + "px"  +")";
    } else {
        eggDiv.style.transition = .2+"s";
        eggDiv.style.transform = "translate("+ valueX + "px" + "," + valueY + "px"  +")";
    }
})

eggDiv.addEventListener('mouseout', (evt) => {
    setTimeout(function() {
        egg.src="assets/cap.png";
    }, 700);
})