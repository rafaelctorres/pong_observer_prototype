// Classe Ball
class Ball extends Subject {
  
  constructor(x,y,radius,dx,dy,observ,isOnGame){
    super();
    
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.speed = 4;
    this.observ = [];
    this.isOnGame = false;
  }
}

  //Gerador de bolas, com função que retorna uma bola baseando-se em um protótipo,
  //sem a necessidade de declarar novas bolas
  const BallFactory = {
      ballPrototype: new Ball(null,0, 0, 0, 0, 0),
    
      createBall: function (x, y, radius, dx, dy, observers, isOnGame) {

        const ball = Object.create(this.ballPrototype);
        
        this.observers = observers;
        ball.x = x;
        ball.y = y;
        ball.radius = radius;
        ball.dx = dx;
        ball.dy = dy;
        ball.isOnGame = true;
      
        return ball;
      }
  }

  //colisão do player 1
  Ball.prototype.collisionp = function (ball, paddle){

    let paddleLeftEdgeX = paddle.x - paddle.width/2;
    let paddleRightEdgeX = paddleLeftEdgeX + paddle.width;
    let paddleTopEdgeY = paddle.y - 50;
    print(paddleTopEdgeY);
    let paddleBottomEdgeY = paddleTopEdgeY + paddle.height;
    
    //checar colisão
    if (this.y > paddleTopEdgeY &&
      this.y < paddleBottomEdgeY &&
      this.x > (paddleLeftEdgeX+10) &&
      this.x < (paddleRightEdgeX+10)) {
              
              
      //inverter sentido
      let distFromCenter = ball.y - paddle.y;
      this.dy = distFromCenter*(0.25);	
      this.dx = -ball.dx;

      //clonar bolas     
      let aleatoX = (this.dx)*random(0.9,1.2)
      let aleatoY = (this.dy)*random(0.9,1.1)
      let ballc = BallFactory.createBall(this.x, this.y, 10, aleatoX, -aleatoY,true);
      balls.push(ballc)

   }
  }
  //colisão do player 2
  Ball.prototype.collisionc = function (ball, paddle){

    let paddleLeftEdgeX = paddle.x - paddle.width/2;
    let paddleRightEdgeX = paddleLeftEdgeX + paddle.width;
    let paddleTopEdgeY = paddle.y - 50;
    print(paddleTopEdgeY);
    let paddleBottomEdgeY = paddleTopEdgeY + paddle.height;
    
    //checar colisão
    if (this.y > paddleTopEdgeY &&
      this.y < paddleBottomEdgeY &&
      this.x > (paddleLeftEdgeX-10) &&
      this.x < (paddleRightEdgeX-10)) {
            
            
      //inverter sentido
      let distFromCenter = ball.y - paddle.y;
      this.dy = distFromCenter*(0.25);	
      this.dx = -ball.dx;

      //clonar bolas
      let aleatoX = (this.dx)*random(0.9,1.2)
      let aleatoY = (this.dy)*random(0.9,1.1)
      let ballc = BallFactory.createBall(this.x, this.y, 10, aleatoX, -aleatoY,true);
      balls.push(ballc)
    }
  }
    
  //draw básico
  Ball.prototype.draw = function () {
    fill(255);
    circle(this.x, this.y, this.radius * 2);
  };

  //Faz com que a bola fique imóvel e sem raio, após sair da tela
  Ball.prototype.ballOut = function () {
    this.radius = 0;
    this.x = width/2;
    this.y = height/2;
    this.dx = 0;
    this.dy = 0;
    this.speed = 0;
  }

  //atualização de posição da bola e checar colisão com paredes
  Ball.prototype.update = function () {
    this.x += this.dx;
    this.y += this.dy;

  // Verifica colisões com as paredes superior e inferior
  if (this.y - this.radius < 0 || this.y + this.radius > height) {
    this.dy = -this.dy;
    this.notify(EVENTS.BALL_TOUCHED_BOTTOM);
  }

  // Verifica se houve um gol e aumenta o score do jogador
  if (this.x - this.radius < 0) {
    this.notify(EVENTS.BALL_TOUCHED_LEFT);
    this.isOnGame = false;
  } else if (this.x + this.radius > width) {
    this.notify(EVENTS.BALL_TOUCHED_RIGHT);
    this.isOnGame = false;
  }
}

  //adiciona observers ao array da classe
  Ball.prototype.attachObserver = function (observer) {
    this.observers.push(observer);
  };
