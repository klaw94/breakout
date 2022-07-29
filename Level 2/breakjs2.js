let board = document.querySelector("#board");
let blocks = new Array();
const visualBlocks = new Array();
const user = document.createElement("div");
const visualBalls = new Array();
visualBalls.push(document.createElement("div"));

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
//let currentPBall = startingPBall;
let gameStarted = false;



class Block{
    constructor(x, y){
        this.left = x;
        this.top = y;
        this.rightCorner = x + 60;
        this.bottom = 480 - y - 20 - 10;
    }
}

class Ball{
    constructor(velocity, x, y){
        this.velocity = velocity;
        this.currentPBall = [x, y];
    }
}

const ballOne = new Ball(5, 90, 40);

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
        block.style.backgroundColor = "blue";
        visualBlocks.push(block);
    
        board.appendChild(block);
    }

    visualBlocks[Math.floor(Math.random() * 50)].style.backgroundColor = "green";
    visualBlocks[Math.floor(Math.random() * 50)].style.backgroundColor = "green";
    visualBlocks[Math.floor(Math.random() * 50)].style.backgroundColor = "green";
    visualBlocks[Math.floor(Math.random() * 50)].style.backgroundColor = "green";
    visualBlocks[Math.floor(Math.random() * 50)].style.backgroundColor = "green";
    visualBlocks[Math.floor(Math.random() * 50)].style.backgroundColor = "green";

    user.classList.add("user");
    board.appendChild(user);
    refreshUserPosition();

    visualBalls[0].classList.add("ball");
    board.appendChild(visualBalls[0]);
    refreshBallPosition(visualBalls[0], ballOne);
}

function refreshUserPosition(){
    user.style.left = currentPosition[0] + "px";
    user.style.bottom = currentPosition[1] + "px";
}

function refreshBallPosition(visualBall, ball){
    visualBall.style.left = ball.currentPBall[0] + "px";
    visualBall.style.bottom = ball.currentPBall[1] + "px";
}

function moveUser(e){
    switch(e.key){
        case 'ArrowLeft': 
            if (!gameStarted){
                moveTheBall(0, -5, ballOne, visualBalls[0]);
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
                moveTheBall(0, -5, ballOne, visualBalls[0]);
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

function moveTheBall(hor, ver, ball, visualBall){
    if (checkForWin()){
        document.querySelector("h1").innerHTML = "Congrats you won! 😃"
        return;
    }
    ball.currentPBall[0] += hor;
    ball.currentPBall[1] += ver;
    refreshBallPosition(visualBall, ball);
    //Check if I hit the user
    if (ball.currentPBall[1] == 0){
        visualBalls.pop();
        if(visualBalls.length === 0){
            document.querySelector("h1").innerHTML = "You lost! 😣";
        } else {
            visualBall.remove();
        }
        return;
    } else if(ball.currentPBall[1] === 30 && ball.currentPBall[0] >= currentPosition[0] - 10 && ball.currentPBall[0] <= currentPosition[0] + userWidth + 5){
        if(ball.currentPBall[0] >= currentPosition[0] + userWidth/3 && ball.currentPBall[0] <= currentPosition[0] + userWidth - userWidth/3){
            setTimeout(moveTheBall, 20, 0, getOpposite(ver), ball, visualBall);
            return;
        } 
        else if(ball.currentPBall[0] >= currentPosition[0] - 10 && ball.currentPBall[0] < currentPosition[0] + userWidth - userWidth/3 * 2){
            setTimeout(moveTheBall, 20, 5, getOpposite(ver), ball, visualBall);
            return;
        } 
        else if(ball.currentPBall[0] > currentPosition[0] + userWidth/3 * 2 && ball.currentPBall[0] <= currentPosition[0] + userWidth + 5){
            setTimeout(moveTheBall, 20, -5, getOpposite(ver), ball, visualBall);
            return;
        }
    //Check if I hit a side of the user
    } else if(ball.currentPBall[1] < 30 && ball.currentPBall[1] > 10 && (ball.currentPBall[0] == currentPosition[0] -5 || ball.currentPBall[0] == currentPosition[0] + userWidth + 5)) {
        if(ball.currentPBall[0] === currentPosition[0] -5) {
            setTimeout(moveTheBall, 20, -5, getOpposite(ver), ball, visualBall);
            return;
        } else if(ball.currentPBall[0] === currentPosition[0] + userWidth + 5) {
            setTimeout(moveTheBall, 20, 5, getOpposite(ver), ball, visualBall);
            return;
        }
    }
    
    //Check if I hit the grid
    if (ball.currentPBall[0] === 0){
        setTimeout(moveTheBall, 20, 5, ver, ball, visualBall);
        return;
    } else if (ball.currentPBall[0] === bordWidth){
        setTimeout(moveTheBall, 20, -5, ver, ball, visualBall);
        return;
    } else if (ball.currentPBall[1] === bordHeigth){
        setTimeout(moveTheBall, 20, hor, getOpposite(ver), ball, visualBall); 
        return;      
    }
    


    //Check if I hit the bottom or side of a block
    for(i = 0; i < blocks.length; i ++){
        if (ball.currentPBall[1] === blocks[i].bottom && ball.currentPBall[0] >= blocks[i].left -5 && ball.currentPBall[0] <= blocks[i].rightCorner){
            if(ver === -5){
                continue;
            } else {
                hitBlock(i);
                setTimeout(moveTheBall, 20, hor, getOpposite(ver), ball, visualBall);
                return;
            }
        } else if(ball.currentPBall[1] >= blocks[i].bottom && ball.currentPBall[1] < blocks[i].bottom + blockHeight + 5&& ball.currentPBall[0] === blocks[i].left){
            console.log(3)
            hitBlock(i);
            setTimeout(moveTheBall, 20, -5, ver, ball, visualBall);
            return;
        } else if(ball.currentPBall[1] >= blocks[i].bottom && ball.currentPBall[1] < blocks[i].bottom + blockHeight +5 && ball.currentPBall[0] === blocks[i].rightCorner){
            console.log(2)
            hitBlock(i);
            setTimeout(moveTheBall, 20, 5, ver, ball, visualBall);
            return;
        } else if(ball.currentPBall[1] === blocks[i].bottom + blockHeight && ball.currentPBall[0] >= blocks[i].left && ball.currentPBall[0] <= blocks[i].rightCorner) {
            console.log(1)
            hitBlock(i);
            setTimeout(moveTheBall, 20, hor, 5, ball, visualBall);
            return;
        }
    } 

    setTimeout(moveTheBall, 20, hor, ver, ball, visualBall);

}

function hitBlock(i){
    if(document.getElementById(i).style.backgroundColor === "blue"){
        console.log("why")
        document.getElementById(i).style.backgroundColor = "#00FFFF";
    } else if(document.getElementById(i).style.backgroundColor === "green"){
        const extraBall = new Ball(5, blocks[i].left, blocks[i].bottom);
        let newBall =  document.createElement("div");
        newBall.classList.add("ball");
        board.appendChild(newBall);
        refreshBallPosition(newBall, extraBall);
        visualBalls.push(newBall);
        moveTheBall(0, -5, extraBall, newBall);
        document.getElementById(i).remove();
        visualBlocks.splice(i, 1);
        blocks[i].bottom = -5780;
        blocks[i].left = -5780;
    } else {
        document.getElementById(i).remove();
        visualBlocks.splice(i, 1);
        blocks[i].bottom = -5780;
        blocks[i].left = -5780;
       
   }
}

function checkForWin(){
    return visualBlocks.length === 0;
}

function getOpposite (num){
    if (num > 0){
        return num - (num * 2);
    } else if (num < 0){
        return num + (num * -2);
    } else if (num === 0){
        return num;
    }
}