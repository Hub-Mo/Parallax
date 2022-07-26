let canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 700;
const CANVAS_HEIGHT = canvas.height = 900;

let layerSpeed = 4;
const keys = [];

const layer1 = new Image();
layer1.src = 'layer-images/1.png';
const layer2 = new Image();
layer2.src = 'layer-images/2.png';
const layer4 = new Image();
layer4.src = 'layer-images/starrs2.png';
const layer3 = new Image();
layer3.src = 'layer-images/startys.png';
const player = new Image();
player.src = 'characters/3.png'



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
        this.speed = layerSpeed * this.speedModifier;
    }
    update(){
        this.speed = layerSpeed * this.speedModifier;
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
    draw(x = this.x, y = this.y) {
        ctx.drawImage(this.image, x, y, this.width, this.height);
    }

}

/*calling the objects*/
const layers1 = new Layer(layer1, .5);
const layers2 = new Layer(layer2, .8, 600, 2000);
//const layers3 = new Layer(layer3, 2.4);
const layers4 = new Layer(layer4, 1);
/*making rick ship move*/
window.addEventListener('keydown', (e) => {
     keys[e.key] = true;
    console.log(keys)
})
window.addEventListener('keyup', (e) => {
    delete keys[e.key];
    player.src = 'characters/3.png';
})
let rick = new Player(player, 2);


/*showing in the canvas*/

function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    /*layers*/
    layers1.update();
    layers1.draw();
    layers2.update();
    layers2.draw();
    layers4.update();
    layers4.draw();
    /*player*/
    if(keys['ArrowUp']){
        rick.y -= rick.speed;
        player.src = 'characters/forward.png';
    }
    if(keys['ArrowLeft']){
        rick.x -= rick.speed;
        player.src = 'characters/1.png'
    }
    if(keys['ArrowDown']){
        rick.y += rick.speed;
        player.src = 'characters/goback.png'
    }
    if(keys['ArrowRight']){
        rick.x += rick.speed;
        player.src = 'characters/2.png';
    }
    rick.draw();



    requestAnimationFrame(animate)
}
animate();