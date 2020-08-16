var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// for starting
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
// for starting

// $(".btn").click(function() {
//
//     }


function nextSequence() {
  // to let the user start with empty array in each level .
    userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);
}


// // Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {
  //Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");
  //Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);


});
// because they willl take the namew of button
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {

  // add
  $("#" + currentColour).addClass("pressed");
  // remove the grey button , for 3 milliseconds
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 300);

}



function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel]=== gamePattern[currentLevel])
  {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else
  {
    playSound("wrong");
    // the red color .
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }


}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
