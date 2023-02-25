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

console.log("🐸");

// Frog sprite
let frog;
// Sound effect
let squeak;
// Check if top or bottom
let isTop=false;
// Check if top or bottom
let isLeft=false;
// Threshold to avoid pixel error
let threshold = 20;

let countSqueak = 0;

function squeakLog(){
  console.log(countSqueak, " squeak!");
  countSqueak += 1;
}

function squeakSound(){
  squeak.play()
}

function preload ()
{
  this.load.image('frog', 'src/frog.png');

  this.load.audio("squeak", "src/squeak.mp3")
}

function create ()
{
  frog = this.physics.add.image(0, 0, 'frog');

  // Sprite physics config
  frog.setVelocity(200, 300);
  frog.setBounce(1, 1);
  frog.setCollideWorldBounds(true);

  if(IS_TOUCH ) frog.setScale(.4); threshold = 30;

  // Sound effect
  squeak = this.sound.add('squeak');
}

function update ()
{
  frog.angle += 1;

  // Check if sprite is below canvas limit 
  if(frog.y - (frog.height/2) <= threshold){
    if (isTop)return; 
    // play sound effect once
    isTop=true;  
    squeakSound();
    squeakLog();
  }
  // Check if sprite is aboce canvas limit 
  if(frog.y - (frog.height/2)  >= (config.height - frog.height) - threshold){
    if (!isTop)return;
    isTop=false;  
    squeakSound();
    squeakLog();
  }
  // Check if sprite is below canvas limit 
  if(frog.x - (frog.width/2) <= threshold){
    if (isLeft)return; 
    // play sound effect once
    isLeft=true;  
    squeakSound();
    squeakLog();
  }
  // Check if sprite is aboce canvas limit 
  if(frog.x - (frog.width/2)  >= (config.width - frog.width) - threshold){
    if (!isLeft)return;
    isLeft=false;  
    squeakSound();
    squeakLog();
  }
}


