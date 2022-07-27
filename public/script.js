/** @type {HTMLCanvasElement} */

let canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 700;
const CANVAS_HEIGHT = canvas.height = 900;

let layerSpeed = 4;
const keys = [];
let enemyLevel = 5;
let enemiesArray = [];

const layer1 = new Image();
layer1.src = 'layer-images/1.png';
const layer2 = new Image();
layer2.src = 'layer-images/2.png';
const layer4 = new Image();
layer4.src = 'layer-images/starrs2.png';
const layer3 = new Image();
layer3.src = 'layer-images/startys.png';
const player = new Image();
player.src = 'characters/3.png';
const fighterJet = new Image();
fighterJet.src = 'characters/UpdatedFighter.png';
const explode = new Image();
explode.src = "characters/Explodeanim.svg";



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

    constructor(image, speed, x = 300, y = 800) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.speed = speed;

    }
    draw({x = this.x, y = this.y, width = this.width, height = this.height}) {
        ctx.drawImage(this.image, x, y, width, height);
    }

}
/*Enemy class*/
/*making enemys spawn at height of 400 pixels so player has chance to dodge*/
class Enemy extends Player{
    constructor(image, speed = Math.random() * 4 + 1,
                x = Math.floor(Math.random() * CANVAS_WIDTH),
                y = Math.floor(Math.random() * 400)) {
        super(image, speed, x, y);
        this.angle = Math.random()*2;
        this.angleSpeed = Math.random()*0.2;
        this.isDead = false;

    }
    update(){
        this.x += 3 * Math.sin(this.angle)
        this.angle += this.angleSpeed;
        this.y+= this.speed
        if(this.y + this.height > 1000){
            this.y = -65;
        }
    }
}
currentImage = fighterJet;
for (i = 0; i < enemyLevel; i++){
    enemiesArray.push(new Enemy(currentImage))
}

/*calling the objects*/
const layers1 = new Layer(layer1, .5);
const layers2 = new Layer(layer2, .8, 600, 2000);
//const layers3 = new Layer(layer3, 2.4);
const layers4 = new Layer(layer4, 1);
/*making Rick's ship move*/
window.addEventListener('keydown', (e) => {
     keys[e.key] = true;
})
window.addEventListener('keyup', (e) => {
    delete keys[e.key];
    player.src = 'characters/3.png';
})

let rick = new Player(player, 6);

/*showing in the canvas*/
function moveRick(){
    if(keys['ArrowUp'] && rick.y > -35){
        rick.y -= rick.speed;
        player.src = 'characters/forward.png';
    }
    if(keys['ArrowLeft'] && rick.x > -35){
        rick.x -= rick.speed;
        player.src = 'characters/1.png'
    }
    if(keys['ArrowDown'] && rick.y < 808){
        rick.y += rick.speed;
        player.src = 'characters/goback.png'
    }
    if(keys['ArrowRight']  && rick.x < 610){
        rick.x += rick.speed;
        player.src = 'characters/2.png';
    }
}

function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    /*layers*/
    layers1.update();
    layers1.draw();
    layers2.update();
    layers2.draw();
    layers4.update();
    layers4.draw();
    /*enemy's*/
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw({width: 80,height :80});
    });
    /*player*/
    moveRick()
    rick.draw({width: 130, height: 130});

    collisions();
    checkIfDead()


    requestAnimationFrame(animate)
}
animate();
console.log(rick);
/* collsion recognition */
function collisions(){
    enemiesArray.forEach(enemy => {
        if(rick.x < enemy.x + enemy.width &&
        rick.x + rick.width > enemy.x &&
        rick.y < enemy.y + enemy.height &&
        rick.y + rick.height > enemy.y){
            rick.isDead = true;
        }
    })
}
function checkIfDead(){
    if(rick.isDead){
        //ctx.drawImage(explode, , 0, 150, 150,  0 , 300 , 200, 250)
        currentImage = explode;
        console.log("DEAD")
        player.src = "characters/Explodeanim.png"
    }
}

