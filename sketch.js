var doraemon,doraemon_running;
var play,playi;

var house;
var housei;

var invisible;
var dbg,bg;

var obs;

var gameState ="Start";

var doraStop;

var sun,sun_img;

var g1,g2,g3,g4,g5,g6,g7;

var obstaclesGroup, gadgetsGroup;

var score =0;

var cloud_img;

var sun,sun_img;

var cloudsGroup;

var gadgets_collected = 0;

var gameOver,gO;

var restart,re;
var sunStop;
var play;
var hideText;
var dh,doraHappy;
var jumpSound;
var stopSound;
var happySound;
var hider;

function preload() {
                    doraemon_running=loadAnimation("dora1.png","dora2.png","dora3.png","dora4.png","dora5.png","dora6.png");
  housei = loadImage("DoraGround.jpg");
  playi = loadImage("play.png");
  obs = loadImage("obstacle.png");
  doraStop = loadAnimation("doraemonCry.png");
  g1 = loadImage("g1.png");
  g2 = loadImage("g2.png");
  g3 = loadImage("g3.png");
  g4 = loadImage("g4.png");
  g5 = loadImage("g5.png");
  g6 = loadImage("g6.png");
  g7 = loadImage("g7.png");
  cloud_img = loadImage("cloud.png");
  sun_img = loadAnimation("s1.png","s2.png");
  gO = loadImage("gameover.png");
  re = loadImage("re.png");
  sunStop = loadAnimation("s1.png");
  doraHappy = loadImage("doraemonHappy.jpg");
  jumpSound = loadSound("jump.mp3");
  stopSound = loadSound("stop.mp3");
  happySound = loadSound("happy.mp3");
}

function setup() {
   createCanvas(windowWidth, windowHeight);
  
  obstaclesGroup = new Group();
  gadgetsGroup   = new Group();
  cloudsGroup    = new Group();
/*
  dbg = createSprite(300,360,400,400);
  dbg.addImage("b",bg);
  dbg.scale = 7;
*/  
 
  
  
house=createSprite(width/2,height+150,400,400);
house.addImage("hut",housei);
house.scale=6.3;
  
  

  
  
doraemon = createSprite(width/2-800,height/2 + 200,10,10);
doraemon.addAnimation("dora",doraemon_running);
doraemon.addAnimation("ds",doraStop);

doraemon.scale = 1.2;
gameOver = createSprite(doraemon.x,doraemon.y-300,10,10);
gameOver.addImage("g",gO);
gameOver.scale = 1.1;


restart = createSprite(doraemon.x,doraemon.y-240,10,10);
restart.addImage("re",re);
restart.scale = 1;


gameOver.visible = false;
restart.visible  = false;

hider = createSprite(270,height/2 -5 + 100,300,20);

play =createSprite(doraemon.x,doraemon.y-100,400,400);
play.addImage("p",playi);
play.scale = 0.8;
play.visible = false;
sun = createSprite(500,50,10,10);
  sun.addAnimation("s",sun_img);
  sun.addAnimation("ss",sunStop);
  sun.scale = 1.2;
  
  invisible = createSprite(doraemon.x,doraemon.y+50,600,5);
  invisible.visible = false;
  
  hideText = createSprite(300,45,1000,22);
  hideText.shapeColor="cyan";
  
  dh = createSprite(100,height/2+200,10,10);
  dh.addImage("ddd",doraHappy);
  dh.visible = false;
  dh.scale = 3;
  


}

function draw() {
  background("cyan");

  console.log( doraemon.y);

  gameOver.visible = false;
  restart.visible  = false;
  camera.position.x = doraemon.x;
  camera.position.y = doraemon.y;

 textSize(20);
  fill("black");
  stroke("black");
  text("Score :" + score,30,height/2 + 100);
  text("Gadgets Collected: " + gadgets_collected,230,height/2 + 100);
  
  if(gameState == "Start"){
    play.visible = true;
    house.visible = false;
    doraemon.visible = false;
    sun.visible = false;
    text("One Day,While playing a game Nobita gave Doraemon a task.",doraemon.x-300,doraemon.y-300);
    text("Doraemon need to go to a forest and collect his hidden gadgets",doraemon.x-300,doraemon.y-240);
    text("by not touching the obstacles which will come on his way.",doraemon.x-300,doraemon.y-180);
    text("Once he collects 50 gadgets,Nobita promised him to give",doraemon.x-300,doraemon.y);
    text("100 doracakes as a reward.",doraemon.x-300,doraemon.y+60);
    text("Click on play button to start your journey as doraemon",doraemon.x-300,doraemon.y+120);
    if(mousePressedOver(play)){
      score = 0;
    gadgets_collected = 0;
    gameState = "Play";
  }
  }
  
  if(gameState =="Play"){
    hideText.visible = false;
    hider.visible = false;

    play.visible = false;
    doraemon.visible = true;
    house.visible = true;
    sun.visible = true;
    
    house.velocityX=-5;
if(house.x<0){
  house.x = house.width/2;
}
Obstacles();
  doraemon.collide(invisible);
 
    score = score + Math.round(getFrameRate()/60);

  if(keyDown("space") && doraemon.y >= 542){
    jumpSound.play();
    doraemon.velocityY = -16;
  }
  doraemon.velocityY = doraemon.velocityY + 0.8;
  
    spawnGadgets();
    spawnClouds();
    
    if(doraemon.isTouching(gadgetsGroup)){
      
      gadgets_collected = gadgets_collected +1;
      
      gadgetsGroup.destroyEach();
       }

   
  if(gadgets_collected == 50){
    happySound.play();
    
       hideText.visible = true;
       dh.visible = true;
        house.visible = false;
     doraemon.visible = false;
     sun.visible = false;
 
       obstaclesGroup.setVelocityXEach(0);
       cloudsGroup.setVelocityXEach(0);
       gadgetsGroup.setVelocityXEach(0);
       obstaclesGroup.destroyEach();
       cloudsGroup.destroyEach();
       gadgetsGroup.destroyEach();
 
       obstaclesGroup.setLifetimeEach(-1);
       cloudsGroup.setLifetimeEach(-1);
       gadgetsGroup.setLifetimeEach(-1);
 
     }
      
    if(doraemon.isTouching(obstaclesGroup)){
      stopSound.play();
      gameState = "End";
    }
  }
  
    if(gameState == "End"){
      
      obstaclesGroup.setVelocityXEach(0);
      gadgetsGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);
      house.velocityX = 0;
      obstaclesGroup.setLifetimeEach(-1);
      gadgetsGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
      doraemon.changeAnimation("ds",doraStop);
      sun.changeAnimation("ss",sunStop);
      gameOver.visible =true;
      restart.visible =true;
      
    doraemon.velocityY = 0;
      if(mousePressedOver(restart)){
        reset();
      }
    }

    hider.shapeColor="cyan";
drawSprites();
}

function Obstacles(){
  if(frameCount % 120 === 0){
  var obstacles = createSprite(580,height/2+200,10,10);
    //obstacles.debug = true;
    obstacles.setCollider("circle",0,0,30);
  obstacles.addImage("ob",obs);
      obstacles.velocityX = -4;
  obstaclesGroup.add(obstacles);
    obstacles.scale = 0.21;
    obstacles.lifetime = 250;
  }

}

function spawnGadgets(){
 if (frameCount % 220 === 0){
   var gadget = createSprite(450,height/2+200,10,40);
 
   
   gadget.velocityX = -4;
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: gadget.addImage(g1);
              break;
      case 2: gadget.addImage(g2);
              break;
      case 3: gadget.addImage(g3);
              break;
      case 4: gadget.addImage(g4);
              break;
      case 5: gadget.addImage(g5);
              break;
      case 6: gadget.addImage(g6);
              break;
      case 7: gadget.addImage(g7);
              break;
              
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    gadget.scale = 1.2;
    gadget.lifetime = 300;
   
   //add each obstacle to the group
    gadgetsGroup.add(gadget);
 }}

function spawnClouds(){
  if(frameCount % 100 === 0){
    var cloud = createSprite(500,100,10,10);
    cloud.addImage("c",cloud_img);
    cloud.y= Math.round(random(200,400));
    cloud.scale= 1.2;
    cloud.velocityX = -4;
    cloud.depth = doraemon.depth;
    doraemon.depth = doraemon.depth +1;
     cloudsGroup.add(cloud);
    cloud.lifetime = 300;
  }
 
}

function reset(){
  gameState = "Play";
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  gadgets_collected = 0;
  obstaclesGroup.destroyEach();
  gadgetsGroup.destroyEach();
  cloudsGroup.destroyEach();
  doraemon.changeAnimation("dora",doraemon_running);
 
  sun.changeAnimation("s",sun_img);
}
