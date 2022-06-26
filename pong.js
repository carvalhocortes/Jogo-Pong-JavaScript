let point = false;

//Table
const mFactor= 50;
const proportionX = 16;
const proportionY = 9;
const sizeTableX = mFactor * proportionX;
const sizeTableY = mFactor * proportionY;
const varBorder = 10;
const varRadiusTable = 10;

//Racquet
const distOfBorder = varBorder + 10;
const sizeRacquetX = 10;
const sizeRacquetY = 100;
const distBorderP1 = distOfBorder;
const distBorderP2 = sizeTableX - sizeRacquetX - distOfBorder;
let distYP1 = sizeTableY / 2 - sizeRacquetY / 2;
let distYP2 = sizeTableY / 2 - sizeRacquetY / 2;

//Score
let poinstP1 = 0;
let poinstP2 = 0;

//Ball
let xBall = sizeTableX / 2;
let yBall = sizeTableY / 2;
const sizeBall = 30;
let movingBall = false;
const radiusBall = sizeBall / 2;
let speedBall = Number(document.querySelector('#Dificuldade').value);
let speedXBall = speedYBall = speedBall;

//game config
let playersInput = 'computer';

function setup() {
    const myCanvas = createCanvas(sizeTableX, sizeTableY);
    myCanvas.parent("game");
}
function draw() {
    background(255);
    drawTable();
    drawBall();
    drawRacquet(distBorderP1, distYP1);
    drawRacquet(distBorderP2, distYP2);
    drawScore();
    drawStart();
    moveBall();
    checkBorderColision();
    moveRacquetP1();
    checkRacquetColision(distBorderP1, distYP1);
    moveRacquetP2(playersInput);
    checkRacquetColision(distBorderP2, distYP2);
    addScore();
    //start();
}
function keyPressed() {
    if (keyCode === 32 && movingBall === false) {
        movingBall = true;
        playersInput = document.querySelector('#Jogadores').value;
        speedBall = Number(document.querySelector('#Dificuldade').value);
        speedXBall = speedXBall/Math.abs(speedXBall)*speedBall;
        speedYBall = speedYBall/Math.abs(speedYBall)*speedBall;
    } else if (keyCode === 32 && movingBall === true){
        movingBall = false;
    }
} 
function start(){
    if (keyPressed(32) && movingBall === false){
        //keyCode = Null
        movingBall = true;
        playersInput = document.querySelector('#Jogadores').value;
        speedBall = Number(document.querySelector('#Dificuldade').value);
        speedXBall = speedYBall = speedBall;
        console.log(speedBall)
    } else if (keyPressed(32) && movingBall === true){
        movingBall = false;
    } 
}
function drawBall(){
    fill(color(255, 204, 0));
    stroke(200);
    strokeWeight(2);
    circle(xBall,yBall, sizeBall)
}
function drawTable(){
    fill(color(255, 204, 0));
    noStroke()
    rect(0, 0, sizeTableX, sizeTableY, varRadiusTable);
    
    fill(color(255, 255, 255));
    stroke(200);
    strokeWeight(2);
    rect(varBorder, varBorder, sizeTableX - 2 * varBorder, sizeTableY - 2 * varBorder, varRadiusTable);
}
function drawRacquet(xPos, yPos){
    fill(color(0, 0, 0));
    noStroke();
    rect(xPos, yPos, sizeRacquetX, sizeRacquetY, 5);
}
function drawScore(){
    const sizeX = 80;
    const sizeY = 30;
    fill(color(255, 204, 0));
    stroke(200);
    strokeWeight(2);
    textAlign(CENTER);
    rect(sizeTableX / 3 - 40, 2 * varBorder, sizeX, sizeY, 15);
    rect(2 * sizeTableX / 3 - 40, 2 * varBorder, sizeX, sizeY, 15);
    fill(255);
    noStroke();
    textSize(4 * sizeY / 5);
    text(poinstP1, sizeTableX / 3, 2 * varBorder + 4 * sizeY / 5);
    text(poinstP2, 2 * sizeTableX / 3,  2 * varBorder + 4 * sizeY / 5 );
}
function drawStart(){
    if (movingBall === false){
        const sizeX = sizeTableX / 5; 
        const sizeY = sizeTableY / 10;
        fill(color(255, 204, 0));
        stroke(0);
        strokeWeight(2);
        rect(sizeTableX / 2 - sizeX / 2, sizeTableY / 2 - sizeY / 2, sizeX, sizeY, 10);
        fill(255);
        noStroke();
        textAlign(CENTER);
        textSize(3 * sizeY / 5);
        text('Pausado', sizeTableX / 2, sizeTableY / 2 + sizeY / 5);
    }
}
function moveBall(){
    if (movingBall === true){
        xBall += speedXBall;
        yBall += speedYBall;
    }
}
function moveRacquetP1(){
    if (keyIsDown(87) && distYP1 > varBorder){
        distYP1 -= 5;
    }
    if (keyIsDown(83) && distYP1 + sizeRacquetY < sizeTableY - varBorder){
        distYP1 += 5;
    }
}

function moveRacquetP2(player){
    if (player === "player"){
        if (keyIsDown(UP_ARROW) && distYP2 > varBorder){
            distYP2 -= 5;
        }
        if (keyIsDown(DOWN_ARROW) && distYP2 + sizeRacquetY < sizeTableY - varBorder){
            distYP2 += 5;
        }
    } else if (player === "computer"){

        if (yBall - sizeRacquetY / 2 >= varBorder && yBall + sizeRacquetY / 2<= sizeTableY - varBorder){ 
            distYP2 = yBall - sizeRacquetY / 2;
        }
        
    }
}
function checkBorderColision(){
    if (xBall + radiusBall > sizeTableX - sizeRacquetX || xBall - radiusBall - sizeRacquetX < 0){
            speedXBall *= -1;
    }
    if (yBall + radiusBall > sizeTableY - sizeRacquetX || yBall - radiusBall - sizeRacquetX < 0){
            speedYBall *= -1;
    }
}
function checkRacquetColision(x, y){
    const colided = collideRectCircle(x, y, sizeRacquetX, sizeRacquetY, xBall, yBall, sizeBall);
    if (colided){
        speedXBall *= -1;
        //raquetada.play();
    }
}

function addScore(){

    if (xBall + radiusBall > distBorderP2 + sizeRacquetX && point === false){
        poinstP1 += 1;        
        point = true;
        //ponto.play();
    } else if (xBall - radiusBall < distBorderP1  && point === false){
        poinstP2 += 1;
        point = true;
        //ponto.play();
    } else if (xBall - radiusBall > distBorderP1 + sizeRacquetX && xBall + radiusBall < distBorderP2) point = false;
}


