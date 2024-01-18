var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


// detect when a keyboard key has been pressed for the first time
$(document).on("keypress", function(){
 if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
 }
});

// this is the button selector
    $('.btn').on("click", function(){
        
        var userChosenColour = $(this).attr('id');
        userClickedPattern.push(userChosenColour);
        

        playSound(userChosenColour);
        animatePress(userChosenColour)
            //called after a user clicked and chosen their answer
        checkAnswer(userClickedPattern.length-1);
        });     


function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence()
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");

        // startover call
        startOver();
    }
}        
 
// random number is being chosen whilst fade in and out animation
function nextSequence(){

    userClickedPattern = [];
    // increase level by 1 everytime nextSequence() is called
    level++;

    //update h1 with this change in the value
    $("#level-title").text("level " + level)

    var randomNumber =  Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
     playSound(randomChosenColour);
  
};

// plays sound according to their color
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

// blinking animation every click
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    },100);
}


// starts over the game
function startOver(){
 level = 0;
 gamePattern = [];
 started = false;

}




// function removeBG(){
//     $(".btn").click(function(){
//         setTimeout(1000);
//         $(".btn").removeClass('pressed');
// })

// }

// var yellow = new Audio('sounds/yellow.mp3');
// // var red = new Audio('sounds/red.mp3');
// // var green = new Audio('sounds/green.mp3');
// // var wrong = new Audio('sounds/wrong.mp3');
// // var blue = new Audio('sounds/blue.mp3');

