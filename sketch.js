//propriedades da Mesa
let multiplicador= 50;
let proportionTelaX = 16;
let proportionTelaY = 9;
let tamanhoTelaX = multiplicador * proportionTelaX;
let tamanhoTelaY = multiplicador * proportionTelaY;

//propriedades da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//propriedades da Raquete
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//variáveis do oponente
let xRaqueteOponente = tamanhoTelaX - raqueteComprimento - 5;
let yRaqueteOponente = 150;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let ponto;
let raquetada;
let trilha;


//function preload(){
//    trilha = loadSound("trilha.mp3");
//    raquetada = loadSound("raquetada.mp3");
//    ponto = loadSound("ponto.mp3");
//}

function setup() {
    const myCanvas = createCanvas(tamanhoTelaX, tamanhoTelaY);
    myCanvas.parent("game");
    //trilha.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    //movimentaBolinha();
    //verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    //mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaMinhaRaquete();
    //movimentaRaqueteOponente();
    //verificaColisaoRaquete(xRaquete, yRaquete);
    //verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    //incluiPlacar();
    //marcaPonto();
}

function mostraBolinha(){
    circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
    if (xBolinha + raio> width ||
        xBolinha - raio< 0){
        velocidadeXBolinha *= -1;
    }
    if (yBolinha + raio> height ||
        yBolinha - raio < 0){
        velocidadeYBolinha *= -1;
    }
}

function mostraRaquete(x,y){
    rect(x, y, raqueteComprimento, 
        raqueteAltura);
}

function movimentaMinhaRaquete(){
    if (keyIsDown(UP_ARROW)){
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)){
        yRaquete += 10;
    }
}

function verificaColisaoRaquete(x, y){
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu){
        velocidadeXBolinha *= -1;
        //raquetada.play();
    }
}

function movimentaRaqueteOponente(){
    velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
    yRaqueteOponente += velocidadeYOponente
}

function incluiPlacar(){
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);
}

function marcaPonto(){
    if (xBolinha > tamanhoTelaX-10){
        meusPontos += 1;
        //ponto.play();
    }
    if (xBolinha < 10){
        pontosDoOponente += 1;
        //ponto.play();
    }
}