var climberImg, climber;
var doorImg, door;
var ghostJumpingImg, ghostJumping;
var ghostImg, ghost;
var towerImg, tower;
var invisibleBlock;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var doorsGroup, climbersGroup, invisiblesGroup;

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  ghostJumpingImg = loadImage("ghost-jumping.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisiblesGroup = new Group();
}

function draw() {
  background(0);
  if (gameState === PLAY) {
  if (keyDown("space")) {
      ghost.velocityY = -7;
  }
  
  ghost.velocityY = ghost.velocityY + 0.5;
  
  if (tower.y > 400) {
      tower.y = 300;
  }
  
  if (keyDown("a")) {
      ghost.velocityX = ghost.velocityX - 0.5;
  }
  
  if (keyDown("d")) {
      ghost.velocityX = ghost.velocityX + 0.5;
  }
  
  
  if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
  }
    if (invisiblesGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
        gameState = END;
    }
  
  spawnDoors();
  
  drawSprites();
    
  } else if (gameState === END) {
             fill("yellow");
              textSize(24);
              text("Game Over", 250, 250);
               
    }
  
  
}

function spawnDoors() {
   
  if (frameCount % 240 === 0) {
    door = createSprite(200,100);
    door.x = Math.round(random(120, 400));
    door.addImage(doorImg); 
    door.scale = 1;
    
    doorsGroup.add(door);
    
    climber = createSprite(200, 160);
    climber.addImage(climberImg); 
    climber.scale = 1;
    
    climbersGroup.add(climber);
    
    climber.x = door.x;
    
    invisibleBlock = createSprite(200, 160);
    invisibleBlock.x = climber.x;     
    // invisibleBlock.visible = false;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.debug = true;    
    invisibleBlock.velocityY = 1;
    
    invisiblesGroup.add(invisibleBlock);
    
    climber.velocityY = 1;
    door.velocityY = 1;
    
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
     
     //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
  } 
}