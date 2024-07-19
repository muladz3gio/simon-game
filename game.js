var userClickedPattern = [];
var gamePattern = [];
var level = 0;
buttonColours = ["red", "blue", "green", "yellow"];
var gameon = false;

$(document).click(function() {
    if (!gameon) {
      $("#level-title").text("Level " + level);
      nextSequence();
      gameon = true;
    }
  });
$(".btn").on("click", function(event){
    userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
})

function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name){
    var audio = new Audio("./"+ name + '.mp3');
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).toggleClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).toggleClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            console.log("User finished the sequence!");
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").toggleClass("game-over");
        setTimeout(function(){
            $("body").toggleClass("game-over");
        }, 200)
        $("#level-title").text("Game Over, Press anywhere to Restart");
        setTimeout(startOver, 200);
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameon = false;
}