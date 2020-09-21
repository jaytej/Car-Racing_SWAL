//This is the class GAME
class Game {
  //This is the constructor that has the properities
  constructor(){

    //This loads the track img with this.image
    this.trackimg = loadImage("images/track.jpg");

    
  }

  //This is the function getState 
  getState(){
    //This refers to the database and adds it to a varaible
    var gameStateRef  = database.ref('gameState');
    //This keeps on checking on what is happening
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  //This is the function update
  update(state){
    //This keeps on checking on what is happening, / means a folder.
    database.ref('/').update({
      gameState: state
    });
  }

  //This waits until all the values have been obtained before continuing
  async start(){

    if(gameState === 0){

      player = new Player();

      //This is checking the reference only one.
      var playerCountRef = await database.ref('playerCount').once("value");
      //If the number exists then it will get execute.
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    //This creates all the car sprites and arrays/
    car1 = createSprite(100,200);
    car1.addImage("car1", car1img);
    car2 = createSprite(300,200);
    car2.addImage("car2", car2img);
    car3 = createSprite(500,200);
    car3.addImage("car3", car3img);
    car4 = createSprite(700,200);
    car4.addImage("car4", car4img);

    car = [car1, car2, car3, car4];

  }

  //This is the function play
  play(){

    //This hides the form
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    player.getRank();
    

    if(allPlayers !== undefined){

      background(bgimg);

      //This is setting the image for the track
      image(this.trackimg, 0 , -displayHeight * 12, displayWidth, displayHeight * 12);

      var index = 0;

      

      var x = 175;
      var y;
    
      for(var plr in allPlayers){

        //Add one to index for every loop. 
        index = index + 1;

        //This is just displaying all the cars at their certain position
        x = x + 275;
        y = displayHeight - allPlayers[plr].distance;
        car[index - 1].x = x;
        car[index - 1].y = y;

        if (index === player.index) {

          fill("red");
          ellipse(x, y, 60, 60);

          car[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2; 
          camera.position.y = car[index - 1].y;

        }
        /*
        var display_position = 130;
        
        if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");

        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        */
        
      }

      console.log(x, y);
     
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){

      player.distance +=50
      player.update();

    }

    if(player.distance > 13400) {

      gameState = 2;

      player.rank += 1;
      Player.updateRank(player.rank);

      
    }

  }

  end() {

    console.log("GAME OVER!");
    console.log(player.rank);
   //adding a temp variable 
    if(rank){
    swal({
      title: "Show Two Buttons Inside the Alert",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: "#00ff99",
      cancelButtonColor: "#ff0099"
    })

    }
    rank=0;
    
 }

}
