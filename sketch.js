var PLAY = 1;
var END = 0;
var gameState = PLAY;

var pappu, pappu_running,pappu_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg
var score=0;
var jumpSound, collidedSound;
var who;
var life = 3;
var rlife = 3;

var gameOver, restart;



function preload(){
  jumpSound = loadSound("jump.wav")
  collidedSound = loadSound("collided.wav")
  
  backgroundImg = loadImage("9090.jpg")
  background30 = loadImage("1.jpg");
  
  pappu_running = loadAnimation("pappu1.png","pappu2.png","pappu3.png","pappu4.png");
  pappu_collided = loadAnimation("pappu5.png");
  
  groundImage = loadImage("ground5.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("yoyo2.gif");
  obstacle2 = loadImage("yoyo3.gif");
  obstacle3 = loadImage("yoyo4.gif");
  obstacle4 = loadImage("yoyo5.gif");

  life1 = loadAnimation("heart_1.png");
  life2 = loadAnimation("heart_2.png");
  life3 = loadAnimation("heart_3.png");

  rlife1 = loadAnimation("h1.png");
  rlife2 = loadAnimation("h2.png");
  rlife3 = loadAnimation("h3.png");

  zombieImg = loadAnimation("r1.png","r6.png","r4.png");
  zombie_collided = loadAnimation("r5.png");

  whoImg = loadImage("who1.png");
  
  gameOverImg = loadImage("game.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
   
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/2
  ground.velocityX = -(0.1 + 0.001*score/1000);
    
  invisibleGround = createSprite(width/2,height-10,width,125);  
  //invisibleGround.shapeColor = "#f4cbaa";
 invisibleGround.visible = false

  pappu = createSprite(250,height-70,20,50);
  pappu.addAnimation("running", pappu_running);
  pappu.addAnimation("collided", pappu_collided);
  pappu.setCollider('circle',0,0,40)
  pappu.scale = 0.8
  //pappu.debug=true

  zombie = createSprite(100,height-130,20,50);
  zombie.addAnimation("zombieImg",zombieImg);
  zombie.addAnimation("collided", zombie_collided);
  zombie.setCollider('circle',0,0,40);
  zombie.scale = 1.3;
 //zombie.debug=true

  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);

  heart1 = createSprite(1100,20);
  heart1.addAnimation("life",life1);
  heart1.scale = 0.3;

  heart2 = createSprite(1130,20);
  heart2.addAnimation("life",life2);
  heart2.scale = 0.3;

  heart3 = createSprite(1100,20);
  heart3.addAnimation("life",life3);
  heart3.scale = 0.3;

  rheart1 = createSprite(1100,60);
  rheart1.addAnimation("rlife",rlife1);
  rheart1.scale = 0.3;

  rheart2 = createSprite(1130,60);
  rheart2.addAnimation("rlife",rlife2);
  rheart2.scale = 0.3;

  rheart3 = createSprite(1100,60);
  rheart3.addAnimation("rlife",rlife3);
  rheart3.scale = 0.3;

  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
 
  // invisibleGround.visible =false

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  whoG = new Group();
  
  score = 0;
}

function draw() {
  background(backgroundImg);
  if (keyIsDown(RIGHT_ARROW))
  background(background30)
  textSize(20);
  fill("yellow")
  text("Score: "+ score,30,50);
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/6);
    ground.velocityX = -(6 + score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && pappu.y  >= height-120) {
      jumpSound.play( )
      pappu.velocityY = -14;
       touches = [];
    }
   
    pappu.velocityY = pappu.velocityY + 0.8
    zombie.y = pappu.y;
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    pappu.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
    who1();

    if(obstaclesGroup.isTouching(pappu)){
        collidedSound.play();

        for(var i =0 ; i<obstaclesGroup.length ; i++){
          if(obstaclesGroup[i].isTouching(pappu)){
            obstaclesGroup[i].destroy()
            life = life -1
          }
        }
        
    }
    

    if (life === 3){
      heart3.visible = true;
      heart1.visible = false;
      heart2.visible = false;
    }

    if (life === 2){
      heart1.visible = false;
      heart2.visible = true;
      heart3.visible = false;
    }

    if (life === 1){
      heart3.visible = false;
      heart2.visible = false;
      heart1.visible = true;
    }

    if(life === 0){
      gameState = END;
    }

    if(obstaclesGroup.isTouching(zombie)){
      collidedSound.play();

      for(var i =0 ; i<obstaclesGroup.length ; i++){
        if(obstaclesGroup[i].isTouching(zombie)){
          obstaclesGroup[i].destroy()
          rlife = rlife -1
        }
      }
      
  }

    if (rlife === 3){
      rheart3.visible = true;
      rheart1.visible = false;
      rheart2.visible = false;
    }

    if (rlife === 2){
      rheart1.visible = false;
      rheart2.visible = true;
      rheart3.visible = false;
    }

    if (rlife === 1){
      rheart3.visible = false;
      rheart2.visible = false;
      rheart1.visible = true;
    }

    if(rlife === 0){
      zombie.visible = false;
    }

    if(whoG.isTouching(pappu)){
      collidedSound.play();

      for(var i =0 ; i<whoG.length ; i++){
        if(whoG[i].isTouching(pappu)){
          whoG[i].destroy()
          life = life +1
        }
      }
      
  }
    
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    pappu.velocityY = 0;
    zombie.velocityY = 0;
    whoG.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

    
    //change the pappu animation
    pappu.changeAnimation("collided",pappu_collided);
    zombie.changeAnimation("collided",zombie_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(touches.length>0 ||  mousePressedOver(restart)) {      
      reset();
      touches = []
    }
  }


  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(100,220));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = width/cloud.velocityX;
    
    //adjust the depth
    cloud.depth = pappu.depth;
    pappu.depth = pappu.depth+1;

    cloud.depth = zombie.depth;
    zombie.depth = zombie.depth+1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(width+20,height-95,20,30);
    obstacle.setCollider('circle',0,0,120)
     //obstacle.debug = true
  
    obstacle.velocityX = -(6 + score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;        
              
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = width/obstacle.velocityX;
    obstacle.depth = pappu.depth;
    pappu.depth +=1;
    obstacle.depth = zombie.depth;
    zombie.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function who1(){
  
    if (World.frameCount % 1000 == 0) {
     
       
        who = createSprite(width,random(height-100,height-200));
        who.addImage(whoImg);
        who.scale = 0.09;
        who.velocityX = -6;
        whoG.add(who);
      }
 
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  pappu.changeAnimation("running",pappu_running);
  zombie.changeAnimation("zombieImg",zombieImg);

  life = life + 3;
  rlife = rlife + 3;

  
  score = 0;
  
}


