
var config = {
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

var game = new Phaser.Game(config);
var frog;
function preload ()
{
  this.load.image('frog', 'public/frog.png');
}

function create ()
{
  frog = this.physics.add.image(400, 100, 'frog');

  frog.setVelocity(100, 300);
  frog.setBounce(1.3, 1);
  frog.setCollideWorldBounds(true);
}

function update ()
{
  frog.angle += 1;
}
