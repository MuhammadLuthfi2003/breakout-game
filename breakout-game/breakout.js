const gameBoard = document.querySelector("#gameBoard");

const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const livesText = document.querySelector("#livesCount");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

//colors
const boardBg = '#323632';
const paddleColor = '#f4fcf4';
const ballColor = paddleColor;
const blockColor = '#f85415';
const paddleBorder = '#eeeeee';

// game settings
const ballRadius = 5;
const paddleSpeed = 50;

let intervalID;
let ballSpeed;

let ballXDirection = 0;
let ballYDirection = 0;

let score = 0;
let running;

let ballX;
let ballY;
let blocksBroken = 0;
let lives = 3;

// making the game object
let paddle = {
    x: 200,
    y : gameHeight - 15,
    width : 100,
    height : 15
}

let blocks = [ // an array full of blocks 
    // height and the width of blocks is always 50 & 15
    {x : 10, y : 0, width : 50, height : 15, color : '#f85415'},
    {x : 70, y : 0, width : 50, height : 15, color : '#f85415'},
    {x : 130, y : 0, width : 50, height : 15, color : '#f85415'},
    {x : 190, y : 0, width : 50, height : 15, color : '#f85415'},
    {x : 250, y : 0, width : 50, height : 15, color : '#f85415'},
    {x : 310, y : 0, width : 50, height : 15, color : '#f85415'},
    {x : 370, y : 0, width : 50, height : 15, color : '#f85415'},
    {x : 430, y : 0, width : 50, height : 15, color : '#f85415'},
    // f8a115
    {x : 40, y : 15, width : 50, height : 15, color : '#f8a115'},
    {x : 100, y : 15, width : 50, height : 15, color : '#f8a115'},
    {x : 160, y : 15, width : 50, height : 15, color : '#f8a115'},
    {x : 220, y : 15, width : 50, height : 15, color : '#f8a115'},
    {x : 280, y : 15, width : 50, height : 15, color : '#f8a115'},
    {x : 340, y : 15, width : 50, height : 15, color : '#f8a115'},
    {x : 400, y : 15, width : 50, height : 15, color : '#f8a115'},
    // f1f815
    {x : 70, y : 30, width : 50, height : 15, color : '#f1f815'},
    {x : 130, y : 30, width : 50, height : 15, color : '#f1f815'},
    {x : 190, y : 30, width : 50, height : 15, color : '#f1f815'},
    {x : 250, y : 30, width : 50, height : 15, color : '#f1f815'},
    {x : 310, y : 30, width : 50, height : 15, color : '#f1f815'},
    {x : 370, y : 30, width : 50, height : 15, color : '#f1f815'},
    // 87f815
    {x : 100, y : 45, width : 50, height : 15, color : '#87f815'},
    {x : 160, y : 45, width : 50, height : 15, color : '#87f815'},
    {x : 220, y : 45, width : 50, height : 15, color : '#87f815'},
    {x : 280, y : 45, width : 50, height : 15, color : '#87f815'},
    {x : 340, y : 45, width : 50, height : 15, color : '#87f815'},
    // 15f8dd
    {x : 130, y : 60, width : 50, height : 15, color : '#15f8dd'},
    {x : 190, y : 60, width : 50, height : 15, color : '#15f8dd'},
    {x : 250, y : 60, width : 50, height : 15, color : '#15f8dd'},
    {x : 310, y : 60, width : 50, height : 15, color : '#15f8dd'},
    {x : 0, y : 60, width : 50, height : 15, color : '#15f8dd'},
    {x : 450, y : 60, width : 50, height : 15, color : '#15f8dd'},
    // 15a8f8
    {x : 160, y : 75, width : 50, height : 15, color : '#15a8f8'},
    {x : 220, y : 75, width : 50, height : 15, color : '#15a8f8'},
    {x : 280, y : 75, width : 50, height : 15, color : '#15a8f8'},
    {x : 30, y : 75, width : 50, height : 15, color : '#15a8f8'},
    {x : 420, y : 75, width : 50, height : 15, color : '#15a8f8'},
    // 2215f8
    {x : 190, y : 90, width : 50, height : 15, color : '#2215f8'},
    {x : 250, y : 90, width : 50, height : 15, color : '#2215f8'},
    {x : 60, y : 90, width : 50, height : 15, color : '#2215f8'},
    {x : 0, y : 90, width : 50, height : 15, color : '#2215f8'},
    {x : 390, y : 90, width : 50, height : 15, color : '#2215f8'},
    {x : 450, y : 90, width : 50, height : 15, color : '#2215f8'},
    // 8715f8
    {x : 220, y : 105, width : 50, height : 15, color : '#8715f8'},
    {x : 90, y : 105, width : 50, height : 15, color : '#8715f8'},
    {x : 30, y : 105, width : 50, height : 15, color : '#8715f8'},
    {x : 360, y : 105, width : 50, height : 15, color : '#8715f8'},
    {x : 420, y : 105, width : 50, height : 15, color : '#8715f8'},
    // f115f8
    {x : 120, y : 120, width : 50, height : 15, color : '#f115f8'},
    {x : 60, y : 120, width : 50, height : 15, color : '#f115f8'},
    {x : 180, y : 120, width : 50, height : 15, color : '#f115f8'},
    {x : 260, y : 120, width : 50, height : 15, color : '#f115f8'},
    {x : 320, y : 120, width : 50, height : 15, color : '#f115f8'},
    {x : 380, y : 120, width : 50, height : 15, color : '#f115f8'},
    // f81594
    {x : 0, y : 135, width : 50, height : 15, color : '#f81594'},
    {x : 50, y : 135, width : 50, height : 15, color : '#f81594'},
    {x : 100, y : 135, width : 50, height : 15, color : '#f81594'},
    {x : 150, y : 135, width : 50, height : 15, color : '#f81594'},
    {x : 200, y : 135, width : 50, height : 15, color : '#f81594'},
    {x : 250, y : 135, width : 50, height : 15, color : '#f81594'},
    {x : 300, y : 135, width : 50, height : 15, color : '#f81594'},
    {x : 350, y : 135, width : 50, height : 15, color : '#f81594'},
    {x : 400, y : 135, width : 50, height : 15, color : '#f81594'},
    {x : 450, y : 135, width : 50, height : 15, color : '#f81594'}
]



// event listenenrs
window.addEventListener("keydown", movePaddle);
resetBtn.addEventListener('click', resetGame);

// start game
gameStart();
// functions

function gameStart() {
    running = true;
    clearBoard();
    drawPaddle();
    createBall();
    nextTick();
}

function nextTick() {
    if (running) {
        intervalID = setTimeout(() => {
            clearBoard();
            drawPaddle();
            drawBlocks();
            moveBall();
            drawBall(ballX, ballY);
            checkCollision();
            detectGameOver();
            nextTick();
        }, 50);
    } else {
        if (blocks.length === 0) {
            displayVictory();
        }
        else if (lives === 0) {
            displayGameOver();
        }
    }
};

function movePaddle(event) {

    const keyPressed = event.keyCode;
    
    const leftArrow = 37;
    const rightArrow = 39;
    const upArrow = 38;
    const downArrow = 40;


    switch(keyPressed) {
        case(leftArrow):
        if (paddle.x > 0) {
            paddle.x = paddle.x - paddleSpeed;
        }
        break;

        case(rightArrow):
        if (paddle.x < gameBoard.width - paddle.width) {
            paddle.x = paddle.x + paddleSpeed;
        }
        break;
    }
}

function drawPaddle() {
    ctx.fillStyle = paddleColor;
    ctx.strokeStyle = paddleColor;
    
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}


function drawBall(ballX, ballY) {
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = paddleColor;

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

function createBall() {
    ballSpeed = 5;

    if(Math.round(Math.random()) == 1) {
        ballXDirection = 1;
    }

    else{
        ballXDirection = -1;
    }

    if(Math.round(Math.random()) == 1) {
        ballYDirection = 1;
    }

    else{
        ballYDirection = -1;
    }

    ballX = gameWidth / 2;
    ballY = 300;
    drawBall(ballX, ballY);
}

function moveBall() {
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);
}

function drawBlocks() {

    blocks.forEach((block) => {
        ctx.fillStyle = block.color;
        ctx.strokeStyle = block.color;
        ctx.fillRect(block.x, block.y, block.width, block.height);
    });
}

function clearBoard() {
    ctx.strokeStyle = paddleBorder;
    ctx.fillStyle = boardBg;

    ctx.fillRect(0,0, gameWidth, gameHeight);
}

function checkCollision() {
    // collision with the gameBoard
    if (ballX >= gameWidth -  ballRadius) {
        ballXDirection *= -1;
    }

    if (ballX <= 0 + ballRadius) {
        ballXDirection *= -1;
    }

    if (ballY <= 0 + ballRadius) {
        ballYDirection *= -1;
    }

    // collision with the paddle
    if ((ballX < (paddle.x + paddle.width)) &&
    ((ballX+ ballRadius) > paddle.x) &&
    (ballY < (paddle.y + paddle.height )) &&
    (( ballY + ballRadius) > paddle.y)) {
        ballYDirection *= -1;
    }

    // collision with the walls
    for (let i = 0; i < blocks.length; i++) {
        if ((ballX < (blocks[i].x + blocks[i].width)) &&
        ((ballX + ballRadius) > blocks[i].x) &&
        (ballY < (blocks[i].y + blocks[i].height )) &&
        (( ballY + ballRadius) > blocks[i].y)) {
            ballYDirection *= -1;
            blocksBroken += 1;
            // ballspeed will increase every 10 blocks
            if (blocksBroken % 10 === 0) {
                ballSpeed += 1;
            }
            ballSpeed += 1;
            blocks.splice(i,1);
            updateScore();
        }
    }
}

function updateScore() {
    score += 1000;

    scoreText.textContent = score;
}

function displayLives() {
    livesText.textContent = `Lives left : ${lives}`;
}

function detectGameOver() {
    if (ballY >= gameHeight + ballRadius && (lives > 0)) {
        lives -= 1;
        createBall();
        displayLives();
    }
    if (lives === 0) {
        running = false;
    }
    if (blocks.length === 0) {
        running = false;
    }
}

function displayVictory() {
    ctx.font = "50px Arial";
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    ctx.fillText("Congrats, You Won!", gameWidth / 2, gameHeight / 2);
    ctx.fillText(`Score : ${score}`, gameWidth / 2, gameHeight / 2 + 50);
}

function displayGameOver() {
    ctx.font = "50px Arial";
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    ctx.fillText("You Lost!", gameWidth / 2, gameHeight / 2);
    ctx.fillText(`Score : ${score}`, gameWidth / 2, gameHeight / 2 + 50);
}

function resetGame() {
    paddle = {
        x: 200,
        y : gameHeight - 15,
        width : 100,
        height : 15
    }

    ballX = gameWidth / 2;
    ballY = 300;

    score = 0;
    lives = 3;

    blocks = [ // an array full of blocks 
    // height and the width of blocks is always 50 & 15
    {x : 10, y : 0, width : 50, height : 15, color : '#f85415'},
    {x : 70, y : 0, width : 50, height : 15, color : '#f85415'},
    {x : 130, y : 0, width : 50, height : 15, color : '#f85415'},
    {x : 190, y : 0, width : 50, height : 15, color : '#f85415'},
    {x : 250, y : 0, width : 50, height : 15, color : '#f85415'},
    {x : 310, y : 0, width : 50, height : 15, color : '#f85415'},
    {x : 370, y : 0, width : 50, height : 15, color : '#f85415'},
    {x : 430, y : 0, width : 50, height : 15, color : '#f85415'},
    // f8a115
    {x : 40, y : 15, width : 50, height : 15, color : '#f8a115'},
    {x : 100, y : 15, width : 50, height : 15, color : '#f8a115'},
    {x : 160, y : 15, width : 50, height : 15, color : '#f8a115'},
    {x : 220, y : 15, width : 50, height : 15, color : '#f8a115'},
    {x : 280, y : 15, width : 50, height : 15, color : '#f8a115'},
    {x : 340, y : 15, width : 50, height : 15, color : '#f8a115'},
    {x : 400, y : 15, width : 50, height : 15, color : '#f8a115'},
    // f1f815
    {x : 70, y : 30, width : 50, height : 15, color : '#f1f815'},
    {x : 130, y : 30, width : 50, height : 15, color : '#f1f815'},
    {x : 190, y : 30, width : 50, height : 15, color : '#f1f815'},
    {x : 250, y : 30, width : 50, height : 15, color : '#f1f815'},
    {x : 310, y : 30, width : 50, height : 15, color : '#f1f815'},
    {x : 370, y : 30, width : 50, height : 15, color : '#f1f815'},
    // 87f815
    {x : 100, y : 45, width : 50, height : 15, color : '#87f815'},
    {x : 160, y : 45, width : 50, height : 15, color : '#87f815'},
    {x : 220, y : 45, width : 50, height : 15, color : '#87f815'},
    {x : 280, y : 45, width : 50, height : 15, color : '#87f815'},
    {x : 340, y : 45, width : 50, height : 15, color : '#87f815'},
    // 15f8dd
    {x : 130, y : 60, width : 50, height : 15, color : '#15f8dd'},
    {x : 190, y : 60, width : 50, height : 15, color : '#15f8dd'},
    {x : 250, y : 60, width : 50, height : 15, color : '#15f8dd'},
    {x : 310, y : 60, width : 50, height : 15, color : '#15f8dd'},
    {x : 0, y : 60, width : 50, height : 15, color : '#15f8dd'},
    {x : 450, y : 60, width : 50, height : 15, color : '#15f8dd'},
    // 15a8f8
    {x : 160, y : 75, width : 50, height : 15, color : '#15a8f8'},
    {x : 220, y : 75, width : 50, height : 15, color : '#15a8f8'},
    {x : 280, y : 75, width : 50, height : 15, color : '#15a8f8'},
    {x : 30, y : 75, width : 50, height : 15, color : '#15a8f8'},
    {x : 420, y : 75, width : 50, height : 15, color : '#15a8f8'},
    // 2215f8
    {x : 190, y : 90, width : 50, height : 15, color : '#2215f8'},
    {x : 250, y : 90, width : 50, height : 15, color : '#2215f8'},
    {x : 60, y : 90, width : 50, height : 15, color : '#2215f8'},
    {x : 0, y : 90, width : 50, height : 15, color : '#2215f8'},
    {x : 390, y : 90, width : 50, height : 15, color : '#2215f8'},
    {x : 450, y : 90, width : 50, height : 15, color : '#2215f8'},
    // 8715f8
    {x : 220, y : 105, width : 50, height : 15, color : '#8715f8'},
    {x : 90, y : 105, width : 50, height : 15, color : '#8715f8'},
    {x : 30, y : 105, width : 50, height : 15, color : '#8715f8'},
    {x : 360, y : 105, width : 50, height : 15, color : '#8715f8'},
    {x : 420, y : 105, width : 50, height : 15, color : '#8715f8'},
    // f115f8
    {x : 120, y : 120, width : 50, height : 15, color : '#f115f8'},
    {x : 60, y : 120, width : 50, height : 15, color : '#f115f8'},
    {x : 180, y : 120, width : 50, height : 15, color : '#f115f8'},
    {x : 260, y : 120, width : 50, height : 15, color : '#f115f8'},
    {x : 320, y : 120, width : 50, height : 15, color : '#f115f8'},
    {x : 380, y : 120, width : 50, height : 15, color : '#f115f8'},
    // f81594
    {x : 0, y : 135, width : 50, height : 15, color : '#f81594'},
    {x : 50, y : 135, width : 50, height : 15, color : '#f81594'},
    {x : 100, y : 135, width : 50, height : 15, color : '#f81594'},
    {x : 150, y : 135, width : 50, height : 15, color : '#f81594'},
    {x : 200, y : 135, width : 50, height : 15, color : '#f81594'},
    {x : 250, y : 135, width : 50, height : 15, color : '#f81594'},
    {x : 300, y : 135, width : 50, height : 15, color : '#f81594'},
    {x : 350, y : 135, width : 50, height : 15, color : '#f81594'},
    {x : 400, y : 135, width : 50, height : 15, color : '#f81594'},
    {x : 450, y : 135, width : 50, height : 15, color : '#f81594'}
    ]

    blocksBroken = 0;
    ballXDirection = 0;
    ballYDirection = 0;
    ballSpeed = 5;

    scoreText.textContent = 0;
    livesText.textContent = `Lives left : 3`;

    gameStart();
}
