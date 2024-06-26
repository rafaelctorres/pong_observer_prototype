// Classe Paddle
class Paddle{
  constructor(x, y, width, height, up, down, distFromEdge, color, dy,){
  this.distFromEdge = 50;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = 255;
  this.dy = 6;
  this.up = up;
  this.down = down;
  
  }
}

  //draw
  Paddle.prototype.draw = function () {
      fill(this.color);
      rect(this.x, this.y, this.width, this.height);
  }

  //movimentação do paddle
  Paddle.prototype.update = function () {
      if (keyIsDown(this.up)) {
        this.y -= this.dy;
      } else if (keyIsDown(this.down)) {
        this.y += this.dy;
      }
    
      // Impede que a barra saia do campo de jogo
      if (this.y - this.height/2 < 0) {
        this.y = this.height/2;
      }
      if (this.y + this.height/2 > height) {
        this.y = height - this.height/2;
      }
  }
  

  