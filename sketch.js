var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImage;
var stoneImage;

var score = 0;
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png")
;}

function setup() {
  createCanvas(600,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup = new Group();
  obstacleGroup = new Group();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") && (player.y > 190)) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(player.isTouching(FoodGroup)){
      FoodGroup.destroyEach(); 
      score = score +1;
      
      switch(score){
        case 10: player.scale = 0.12;
          break;
        case 20: player.scale = 0.22;
          break;
        case 30: player.scale = 0.32;
          break;
        case 40: player.scale = 0.42;
          break;
          default: break;
      }
    }

    if (frameCount % 80 === 0) {
      spawnBanana(); 
     }

     if (frameCount % 300 === 0) {
      spawnRock(); 
     }

     if (player.isTouching(obstacleGroup)){
      player.scale = 0.1;
    }
    
    if(player.isTouching(obstacleGroup) && (player.scale = 0.1)){
       gameState = END;
       }  
  }

  else if(gameState === END){
    backgr.visible = false;
    backgr.velocityX = 0;
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    player.visible = false;
    textSize(40);
    fill("white");
    text("game over!",200,200);
  }

  drawSprites();
  textSize(20);
  fill("white");
  text("score:" + score,450,50);
}

function spawnBanana(){
  banana = createSprite(605,1000,10,40);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.y = Math.round(random(100,330));
  banana.velocityX = -10;
  banana.lifetime = 100;
  FoodGroup.add(banana);
}

function spawnRock(){
  obstacle = createSprite(605,340,50,50);
  obstacle.addImage(stoneImage);
  obstacle.scale = 0.2;
  obstacle.velocityX = -10;
  obstacle.lifetime = 100;
  obstacleGroup.add(obstacle);
}