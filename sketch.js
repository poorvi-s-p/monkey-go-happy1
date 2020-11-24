
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaceGroup
var ground,invisibleGround;
var score
var survivalTime=0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(500,500);
// CREATING THE MONKEY 
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1; 
  monkey.debug = true
 
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  
   FoodGroup = new Group();
  obstacleGroup = new Group();

}


function draw() {
  background("white");
   
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
     
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survivalTime:"+survivalTime,100,50);
  
  
  
  invisibleGround = createSprite(490,360,1000,10);
  invisibleGround.visible = false;
  
  
    //jump when the space key is pressed
    if(keyDown("space")&& monkey .y >= 100) {
        monkey.velocityY = -12;
    }
      monkey.velocityY = monkey.velocityY + 0.8;
monkey.collide(invisibleGround); 

    if(obstacleGroup.isTouching(monkey)){
      console.log("in")
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
    
    }
  

  
  spawnBanana();
  spawnObstacle();
  drawSprites();
}

function spawnBanana(){
  if(frameCount % 80 ===0 ){
    banana=createSprite(400,200,20,20);
 banana.addImage("banana.png",bananaImage);
    banana.y = Math.round(random(120,200));
  banana.scale=0.1;
    banana.velocityX = -4;
    
    banana.depth = monkey.depth;
    monkey.depth = banana.depth + 1;
    
   
    FoodGroup.add(banana);
  }
  }
function spawnObstacle(){
  if(frameCount % 60===0){
    obstacle =createSprite(800,320,10,40);
obstacle.addImage("obstacle.png",obstaceImage);
    obstacle.velocityX=-4;
    obstacle.scale=0.2;
    
  //  obstacle.depth = monkey.depth;
  //  monkey.depth = obstacle.depth + 1;
    
    obstacle.lifetime=200;
obstacleGroup.add(obstacle);
    
  }
}