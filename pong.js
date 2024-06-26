
function setup() {
 
  createCanvas(width, height);
  rectMode(CENTER)
  
  //cria os paddles e objetoS de achievements e UI
  player = new Paddle(paddleWidth/2, height / 2, paddleWidth, paddleHeight, 87, 83);
  computer = new Paddle(width - paddleWidth/2, height / 2, paddleWidth, paddleHeight,38,40);
  achievementSystem = new Achievements;
  uiSystem = new UI;

  // definir o numero de bolas
  for (let i = 0; i < 1; i++) { 
    const x = random(1*width/4, 3*width/4);
    const y = random(1*height/4,3*height/4);
    const dx = random([-1, 1]) * 4;
    const dy = random([-1, 1]) * 4;
    const ball = BallFactory.createBall(x, y, 10, dx, dy);
    balls.push(ball);
  }
  
  // adicionando os observers
  for (let ball of balls) {
    ball.attachObserver(achievementSystem)
    ball.attachObserver(uiSystem)
  } 
}

function draw() {
  background(0);

  //checa se ainda há bolas
  let j = 0;
  for(let i = 0; i<balls.length; i++){
    if (balls[i].isOnGame==true){ j++}

  } 

  //mostra a tela de fim de jogo, caso não haja mais bolas
  if(j==0){
    fill(255)
    text("Game over", width/2-80, height/2-80);
    if (playerScore>computerScore){
      text("Player 1 wins", width/2-80, height/2 - 40);
    } 
    else if (computerScore>playerScore){
        text("Player 2 wins", width/2-80, height/2 - 40);
    }
  } 

  //o jogo começa/continua
  else { 
    player.update();
    computer.update();

  //movimentação, colisão e redefinição de bolas que saíram da tela
    for (let ball of balls) {
      if (ball.isOnGame == true){
        ball.update();
        let p = player;
        let p2 = computer;
        ball.collisionp(ball,p);
        ball.collisionc(ball,p2);
      } 
      else if(ball.isOnGame == false){
        ball.ballOut();
      }
      ball.draw();
    }

    player.draw();
    computer.draw();

    drawNet();
    drawScores();
  }
}

//desenho da rede(apenas visual, sem funcionalidades)
function drawNet() {
  fill(255);
  for (let i = 0; i <= height; i += 15) {
    rect(width / 2 - 1, i, 2, 10);
  }
}

//placar sendo mostrado
function drawScores() {
  fill(255);
  textSize(32);
  text(playerScore, width / 4, 50);
  text(computerScore, (width * 3) / 4, 50);
}
