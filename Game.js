class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    runner1 = createSprite(200,100);
    runner2 = createSprite(200,300);
    runner3 = createSprite(200,500);
    runner4 = createSprite(200,700);
    runners = [runner1, runner2, runner3, runner4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    //player.getrunnersAtEnd();

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
     // image(track, 0,-displayHeight*4,displayWidth, displayHeight*5-50);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the runners
      var x;
      var y = 200;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the runners a little away from each other in x direction
        y = y + 200;
        //use data form the database to display the runners in y direction
        x = displayHeight + allPlayers[plr].distance+150;
        runners[index-1].x = x;
        runners[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          runners[index - 1].shapeColor = "red";
          camera.position.y = displayWidth/2;
          camera.position.x = runners[index-1].x;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      //player.rank++;
      //Player.updaterunnersAtEnd(player.rank);
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    //console.log(player.rank);
  }
}
