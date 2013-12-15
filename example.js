
// deps
var raf = require('raf');
var arrows = require('arrows');

// loop
loop();

function loop(){
  raf(function(){
    loop();
    ctrl();
    anim();
    draw();
  });
}

function ctrl(){
  player.ctrl();
}

function anim(){
  player.anim();
}

function draw(){
  player.draw();
  shadow.draw();
}

// world constants
var scale = 4;
var gravity = 0.38;
var impact = 0.6;

// player
var player = {};
player.el  = document.getElementById('player');
player.pos = { x: 250, y: 400, z: 0 };
player.vel = { x: 0,   y: 0,   z: 0 };

player.left  = move(-1, 0);
player.up    = move( 0,-1);
player.right = move( 1, 0);
player.down  = move( 0, 1);

player.jump = function(){
  if (2 < Math.abs(player.vel.z) || 2 < player.pos.z) return;
  player.vel.z = 10;
};

player.ctrl = function(){
  k & k.left  && player.left();
  k & k.right && player.right();
  k & k.up    && player.up();
  k & k.down  && player.down();
  k & k.shoot && player.jump();
};

player.draw = function(){
  player.el.style.left = player.pos.x + 'px';
  player.el.style.top = player.pos.y - player.pos.z + 'px';
};

player.anim = function(){
  player.vel.z -= gravity;
  player.pos.x += player.vel.x * scale;
  player.pos.y += player.vel.y * scale;
  player.pos.z += player.vel.z;
  if (player.pos.z < 0) {
    player.vel.z = -player.vel.z * impact;
    player.pos.z = 0;
  }
  player.vel.x *= 0.95;
  player.vel.y *= 0.95;
};

// shadow
var shadow = {};
shadow.el  = document.getElementById('shadow');
shadow.pos = { x: 0, y: 0 };
shadow.draw = function(){
  shadow.el.style.left = player.pos.x + 1 + player.pos.z + 'px';
  shadow.el.style.top = player.pos.y + 1 + player.pos.z / 2 + 'px';
};

// arrow controls
var k = arrows();
document.body.onkeydown = k.onkeydown;
document.body.onkeyup = k.onkeyup;

// xy motion
function move(x, y){
  return function(){
    this.vel.x |= x;
    this.vel.y |= y;
  };
}
