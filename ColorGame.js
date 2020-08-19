var colors;
var pickedColor;
var difficulty = 6;

var squares = document.querySelectorAll(".square");
var header = document.querySelector(".header");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#resetButton");
var modeButton = document.querySelectorAll(".mode");

reset();

resetButton.addEventListener("click", reset);





function reset(){
    colors = generateRandomColors(difficulty);
    pickedColor= pickColor();

    colorDisplay.textContent = pickedColor;
    header.style.backgroundColor = "#4b9fa3";
    resetButton.textContent = "NEW COLORS";
    messageDisplay.textContent = "";
    newColors();
}


function generateRandomColors(difficulty){
    var randomColors = [];
    for(var i = 0; i < difficulty; i++){
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        randomColors.push("rgb(" + r + ", " + g + ", " + b + ")");
    }
    return randomColors;
}


function changeColors(color){
    for(var i=0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    //Math.random = picks between 0 and 1
    //Math.floor = picks whole number
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function newColors(){
    for(var i = 0; i < squares.length; i++){
        // add initial color to squares
        squares[i].style.backgroundColor = colors[i]
    
        // add clicked event
        squares[i].addEventListener("click", function(){
            var clickedColor = this.style.backgroundColor;
            console.log(clickedColor, pickedColor);
            if(clickedColor === pickedColor){
                header.style.backgroundColor = this.style.backgroundColor;
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                resetButton.textContent = "PLAY AGAIN?"
            }
            else{
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
                
            }
        });
    }
}



function setUpModeListeners(){
    for(var i = 0; i < modeButton.length; i++){
        modeButton[i].addEventListener("click", function(){
            modeButton[0].classList.remove("selected");
            modeButton[1].classList.remove("selected");
            this.classList.add("selected");
    
            //this.textContent === "EASY" ? difficulty = 3: difficulty = 6;
            if(this.textContent === "EASY"){
                difficulty = 3;
                for(var i= 3; i < 6; i++)
                squares[i].style.display = "none";
            }
            else{
                difficulty = 6;
                for(var i= 3; i < 6; i++)
                    squares[i].style.display = "block";
            }
            reset();
        });
    }    
}