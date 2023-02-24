let IS_TOUCH	= false;
window.addEventListener('touchstart', function()
{			
  IS_TOUCH	= true;
});
let config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 200 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update:update
  }
};

let game = new Phaser.Game(config);

// Frog sprite
let frog;
// Sound effect
let boing;
// Check if top or bottom
let isTop=false;
// Check if top or bottom
let isLeft=false;
// Threshold to avoid pixel error
let threshold = 20;

function preload ()
{
  this.load.image('frog', 'src/frog.png');

  this.load.audio("boing", "src/boing.mp3")
}

function create ()
{
  frog = this.physics.add.image(0, 0, 'frog');

  // Sprite physics config
  frog.setVelocity(200, 300);
  frog.setBounce(1, 1);
  frog.setCollideWorldBounds(true);

  if(IS_TOUCH ) frog.setScale(.5);

  // Sound effect
  boing = this.sound.add('boing');
}

function update ()
{
  frog.angle += 1;

  // Check if sprite is below canvas limit 
  if(frog.y - (frog.height/2) <= threshold){
    if (isTop)return; 
    // play sound effect once
    isTop=true;  
    boing.play();
    console.log("top");
  }
  // Check if sprite is aboce canvas limit 
  if(frog.y - (frog.height/2)  >= (config.height - frog.height) - threshold){
    if (!isTop)return;
    isTop=false;  
    boing.play();
    console.log("bottom");
  }
  // Check if sprite is below canvas limit 
  if(frog.x - (frog.width/2) <= threshold){
    if (isLeft)return; 
    // play sound effect once
    isLeft=true;  
    boing.play();
    console.log("left");
  }
  // Check if sprite is aboce canvas limit 
  if(frog.x - (frog.width/2)  >= (config.width - frog.width) - threshold){
    if (!isLeft)return;
    isLeft=false;  
    boing.play();
    console.log("right");
  }
}
