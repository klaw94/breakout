let board = document.querySelector("#board");
let blocks = new Array();
const visualBlocks = new Array();
const user = document.createElement("div");
const ball = document.createElement("div");
const startingPosition = [40, 10];
let currentPosition = startingPosition;
const userWidth = 100;
const blockHeight = 20;
const blockWidth = 60;
const bordWidth = 655;
const bordHeigth = 470;

document.addEventListener("keydown", (e) => {
    moveUser(e)
});
const startingPBall = [90, 40];
let currentPBall = startingPBall;
let gameStarted = false;



class Block{
    constructor(x, y){
        this.left = x;
        this.leftBottom = y + 20;
        this.top = y;
        this.rightCorner = x + 60;
        this.bottom = 480 - y - 20 - 10;
    }
}

populateTheBoard();

function populateTheBoard(){
    for (i = 0; i < 5; i++){
        for (x = 0; x < 10; x++){
        let block = new Block(10 + 65 * x, 10 + 30 * i);
        blocks.push(block);
        }
    }

    for (i = 0; i < 50; i++){
        let block = document.createElement("div");
        block.classList.add("block");
        block.style.left = blocks[i].left + "px";
        block.style.top = blocks[i].top + "px";
        block.setAttribute("id", i);
        visualBlocks.push(block);
    
        board.appendChild(block);
    }

    user.classList.add("user");
    board.appendChild(user);
    refreshUserPosition();

    ball.classList.add("ball");
    board.appendChild(ball);
    refreshBallPosition();
}

function refreshUserPosition(){
    user.style.left = currentPosition[0] + "px";
    user.style.bottom = currentPosition[1] + "px";
}

function refreshBallPosition(){
    ball.style.left = currentPBall[0] + "px";
    ball.style.bottom = currentPBall[1] + "px";
}

function moveUser(e){
    switch(e.key){
        case 'ArrowLeft': 
            if (!gameStarted){
                moveTheBallDown(0);
                gameStarted = true;
                return gameStarted;
            }
            if(currentPosition[0] > 10){
                currentPosition[0] -= 15;
                refreshUserPosition();
            } else if (currentPosition[0] >= 0){
                currentPosition[0] = 0;
                refreshUserPosition();
            }
            break;
        case 'ArrowRight': 
            if (!gameStarted){
                moveTheBallDown(0);
                gameStarted = true;
                return gameStarted;
            }
            if(currentPosition[0] < 560){
                currentPosition[0] += 15;
                refreshUserPosition();
            } else if (currentPosition[0] > 560){
                currentPosition[0] = 564;
                refreshUserPosition();
            }
            break;
        case ' ':
            window.location.reload();
            break;
    }

}

function moveTheBallDown(num){
    if (checkForWin()){
        document.querySelector("h1").innerHTML = "Congrats you won! 😃"
        return;
        }
    currentPBall[0] += num;
    currentPBall[1] -= 5;
    refreshBallPosition();
    if (currentPBall[1] == 0){
        document.querySelector("h1").innerHTML = "You lost! 😣";
        return;
    } else if(currentPBall[1] == 30 && currentPBall[0] >= currentPosition[0] - 10 && currentPBall[0] <= currentPosition[0] + userWidth + 5){
        if(currentPBall[0] >= currentPosition[0] + 40 && currentPBall[0] <= currentPosition[0] + userWidth - 40){
            setTimeout(moveTheBallUp, 20, 0);
            return;
        } 
        else if(currentPBall[0] >= currentPosition[0] - 10 && currentPBall[0] < currentPosition[0] + userWidth - 60){
            setTimeout(moveTheBallUp, 20, 5);
            return;
        } else if(currentPBall[0] > currentPosition[0] + 60 && currentPBall[0] <= currentPosition[0] + userWidth + 5){
            setTimeout(moveTheBallUp, 20, -5);
            return;
        }

    } else if(currentPBall[1] < 30 && currentPBall[1] > 10 && (currentPBall[0] == currentPosition[0] -5 || currentPBall[0] == currentPosition[0] + userWidth + 5)) {
        if(currentPBall[0] == currentPosition[0] -5) {
            setTimeout(moveTheBallUp, 20, -5);
            return;
        } else if(currentPBall[0] == currentPosition[0] + userWidth + 5) {t
            setTimeout(moveTheBallUp, 20, 5);
            return;
        }
    }
    
    for(i = 0; i < blocks.length; i++){
        if (currentPBall[1] >= blocks[i].bottom && currentPBall[1] <= blocks[i].bottom + blockHeight + 5 && currentPBall[0] == blocks[i].left){
            hitBlock(i);
            setTimeout(moveTheBallDown, 20, -5);
            return;
        } else if(currentPBall[1] >= blocks[i].bottom && currentPBall[1] <= blocks[i].bottom + blockHeight + 5 && currentPBall[0] == blocks[i].rightCorner){
            hitBlock(i);
            setTimeout(moveTheBallDown, 20, 5);
            return;
        } else if(currentPBall[1] == blocks[i].bottom + blockHeight && currentPBall[0] >= blocks[i].left -5 && currentPBall[0] <= blocks[i].rightCorner + 5) {
            hitBlock(i);
            setTimeout(moveTheBallUp, 20, num);
            return;
        }
    } 
    
    if (currentPBall[0] == 0){
        setTimeout(moveTheBallDown, 20, 5);
        return;
    } else if (currentPBall[0] == bordWidth){
        setTimeout(moveTheBallDown, 20, -5);
        return;
    } 
    
    setTimeout(moveTheBallDown, 20, num);

}

function moveTheBallUp(num){
    if (checkForWin()){
        document.querySelector("h1").innerHTML = "Congrats you won! 😃"
        return;
        }

    currentPBall[0] += num;
    currentPBall[1] += 5;
    refreshBallPosition();
    for(i = 0; i < blocks.length; i ++){
        if (currentPBall[1] == blocks[i].bottom && currentPBall[0] >= blocks[i].left -5 && currentPBall[0] <= blocks[i].rightCorner){
            hitBlock(i);
            setTimeout(moveTheBallDown, 20, num);
            return;
        } else if(currentPBall[1] >= blocks[i].bottom && currentPBall[1] <= blocks[i].bottom + blockHeight + 5 && currentPBall[0] == blocks[i].left){
            hitBlock(i);
            setTimeout(moveTheBallUp, 20, -5);
            return;
        } else if(currentPBall[1] >= blocks[i].bottom && currentPBall[1] <= blocks[i].bottom + blockHeight + 5 && currentPBall[0] == blocks[i].rightCorner){
            hitBlock(i);
            setTimeout(moveTheBallUp, 20, 5);
            return;
        }
    } 

    if (currentPBall[0] == 0){
        setTimeout(moveTheBallUp, 20, 5);
        return;
    } else if (currentPBall[0] == bordWidth){
        setTimeout(moveTheBallUp, 20, -5);
        return;
    } else if (currentPBall[1] == bordHeigth){
        setTimeout(moveTheBallDown, 20, num);       
    } else {
        setTimeout(moveTheBallUp, 20, num);
    }


}

function hitBlock(i){
    if(document.getElementById(i).style.backgroundColor != "rgb(0, 255, 255)"){
        document.getElementById(i).style.backgroundColor = "#00FFFF";
    } else {
        document.getElementById(i).remove();
        visualBlocks.splice(i, 1);
        blocks[i].bottom = -5780;
        blocks[i].left = -5780;
       
   }
}

function checkForWin(){
    return visualBlocks.length == 0;
}