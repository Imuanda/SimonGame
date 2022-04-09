var buttonCls = ["red","blue","green","yellow"];

var gamePtrn = [];

var userClickedPtrn = [];
var start = false; //Initialize to know when to start the game
var level = 0; //Starting level of the game to be called when the game starts

//Use "one" to make sure to call the function only once on the first key pressed
//To start the game
function gameStart(){
  $(document).one("keydown",function(){
    if(!start){
      $("h1").text("Level "+ level);
      nextSQC();
    }
  });
}

gameStart();

function nextSQC(){
  userClickedPtrn = [];
  level ++;
  $("h1").text("🥳 Level "+ level);
  var randomNum = Math.floor(Math.random() * 4);

  var randomClr = buttonCls[randomNum];
  gamePtrn.push(randomClr);

  $("#" + randomClr).fadeIn(200).fadeOut(200).fadeIn(200);
  //Add sounds
  var music = "sounds/" + randomClr + ".mp3";
  playSound(music);
}


// Step 4 - Check Which Button is Pressed and play the game

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  var path = "sounds/" + userChosenColor + ".mp3";
  userClickedPtrn.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(path)

  //To play the game, click on the colors

  //TO check the pattern and move to the next level the userClickedPtrn needs
  //To match the entire array of the gamePtrn
  checkAnswer(userClickedPtrn.length - 1);

});

//Animate the button when clicked
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
      $("#" + currentColor).removeClass("pressed");

    }, 100);
}

//Play sounds 
function playSound(name){
  var audio = new Audio(name);
  audio.play();
}

function checkAnswer(currentLevel){
  /*Logic by Dejan Antic Udemy*/

  //So check the current level of the two arrays( meaning last element)
  //If both have the same last elements then check if both arrays have the same
  //length... If they don't have the same length then it's game over.
  if(gamePtrn[currentLevel] === userClickedPtrn[currentLevel]){
    var count = 0; // To keep up with the number of time the user got the right answer
    for(var i = 0; i < gamePtrn.length; i++){
      if(userClickedPtrn[i] === gamePtrn[i]){
        count++; // If both arrays have the same elements, it means the user manage to get
        //Everything right... SO increment the count variable.

      }
    }
      if(count === gamePtrn.length){
        //If the number of time the user manage to get everything right is equal
        //to the length of the game pattern array then call the next sequence
        // userClickedPtrn = []; Reinitialize the array every time... we can do this by
        //Reinitializing it inside the  nextSQC function

        setTimeout(function () {
          nextSQC()
        }, 1000);
      }
    }
    //If they are not on the same level then it's game over
      else{
            //Play the wrong.mp3
            var wrong = "sounds/wrong.mp3";
            playSound(wrong);

            //Change the h1, set the background color to red then remove it after 100 mls
            $("h1").text("🥺Game Over!!Press any key to restart");
            $("body").addClass("game-over");
            setTimeout(function () {
              $("body").removeClass("game-over")
                }, 100);

            //Restart the game by pressing a any key:
            //First Reinitialize both arrays (Game patern and user click...)
            //Reinitialize the level to 0 as well
            //Then call the nextSQC after pressing any key
            level = 0;
            gamePtrn = [];
            // userClickedPtrn = [];  Reinitialize the array every time
            gameStart();
      }
}
