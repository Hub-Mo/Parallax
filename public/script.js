const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 700;
const CANVAS_HEIGHT = canvas.height = 900;

let gameSpeed = 3;


const layer1 = new Image();
layer1.src = '../layer-images/1.png';
const layer2 = new Image();
layer2.src = '../layer-images/2.png';
const layer4 = new Image();
layer4.src = '../layer-images/starrs2.png';
const layer3 = new Image();
layer3.src = '../layer-images/startys.png';
const player = new Image();
player.src = '../characters/ricks-ship.png'


/*parallax layering class */
class Layer {
    constructor(image, speedModifier, width = 700, height = 2000){
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.y2 = this.height;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update(){
        this.speed = gameSpeed * this.speedModifier;
        if(this.y >= 2000){
            this.y = -this.height + this.y2 - this.speed;
        }else this.y += this.speed;
        if(this.y2 >= 2000){
            this.y2 = -this.height + this.y - this.speed;
        }else this.y2 += this.speed;
    }
    draw(width = this.width, height = this.height){
        ctx.drawImage(this.image, this.x, this.y, width, height);
        ctx.drawImage(this.image, this.x, this.y2, width, height);

    }
}

/*player class*/
class Player {
    constructor(image, speed) {
        this.image = image;
        this.x = 300;
        this.y = 800;
        this.width = 100;
        this.height = 100;
        this.speed = speed;
    }

}
const layers1 = new Layer(layer1, .5);
const layers2 = new Layer(layer2, 1, 600, 2000);
//const layers3 = new Layer(layer3, 2.4);
const layers4 = new Layer(layer4, 1.2);



function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    layers1.update();
    layers1.draw();
    layers2.update();
    layers2.draw();
/*    layers3.update();
    layers3.draw();*/
    layers4.update();
    layers4.draw();
/*    ctx.drawImage(layer1,0,y);
    ctx.drawImage(layer1,0,y2);
    ctx.drawImage(layer2,0,ylayer2);
    ctx.drawImage(layer2,0,y2layer2);
    ctx.drawImage(layer3,60,y2layer2);
    ctx.drawImage(player, 300, 800, 100, 100);
    if( y > 2000) y = -2000 + y2 - gameSpeed;
    else y += gameSpeed;
    if( y2 > 2000) y2 = -2000 + y - gameSpeed;
    else y2 += gameSpeed;*/
/*
    if( ylayer2 > 1550) ylayer2 = -1550 + y2layer2 - gameSpeed2;
    else ylayer2 += gameSpeed2;
    if( y2layer2 > 1550) y2layer2 = -1550 + ylayer2 - gameSpeed2;
    else y2layer2 += gameSpeed2;*/
    requestAnimationFrame(animate)
}
animate();