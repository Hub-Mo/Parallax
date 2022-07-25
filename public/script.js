const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 700;
const CANVAS_HEIGHT = canvas.height = 900;

let gameSpeed = 2;
let gameSpeed2 = 3;

const layer1 = new Image();
layer1.src = '../layer-images/1.png';
const layer2 = new Image();
layer2.src = '../layer-images/2.png';
const layer3 = new Image();
layer3.src = '../characters/rick-and-morty-wars.png';

console.log(layer1);
let y = 0;
let y2 = -2000;
let ylayer2 = 0;
let y2layer2 = -2000;

function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(layer1,0,y);
    ctx.drawImage(layer1,0,y2);
    ctx.drawImage(layer2,0,ylayer2);
    ctx.drawImage(layer2,0,y2layer2);
    if( y > 2000) y = -2000 + y2 - gameSpeed;
    else y += gameSpeed;
    if( y2 > 2000) y2 = -2000 + y - gameSpeed;
    else y2 += gameSpeed;

    if( ylayer2 > 1550) ylayer2 = -1550 + y2layer2 - gameSpeed2;
    else ylayer2 += gameSpeed2;
    if( y2layer2 > 1550) y2layer2 = -1550 + ylayer2 - gameSpeed2;
    else y2layer2 += gameSpeed2;
    requestAnimationFrame(animate)
}
animate();