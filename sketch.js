var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var car1, car2, car3, car4;

var car;

var car1img, car2img, car3img, car4img;

var trackimg;

var bgimg;

var rank=1;



function preload() {

  car1img = loadImage("images/car1.png");
  car2img = loadImage("images/car2.png");
  car3img = loadImage("images/car3.png");
  car4img = loadImage("images/car4.png");

  bgimg = loadImage("images/track.png");

  GameOverImg = loadImage("images/game_over_PNG57.png");

}

function setup(){
  canvas = createCanvas(displayWidth - 50, displayHeight - 130);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();


}


function draw(){
  if(playerCount === 4){

    game.update(1);

  }

  if(gameState === 1){

    clear();
    game.play();
    drawSprites();

  }

  if (gameState === 2) {

    game.end();

  }
   

  
}

//function windowResized() { resizeCanvas(displayWidth, displayHeight); }
