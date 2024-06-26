//canvas
const width = 800;
const height = 400;

//achievements
const EVENTS = {
  BALL_TOUCHED_BOTTOM: 'ballTouchedBottom',
  BALL_TOUCHED_PADDLE: 'ballTouchedPaddle',
  PADDLE_TOUCHED_WALL: 'paddleTouchedWall',
  BALL_TOUCHED_RIGHT: 'ballTouchedRight',
  BALL_TOUCHED_LEFT: 'ballTouchedLeft'
}

//entidades 
let player, computer;
let balls = [];
let playerScore = 0;
let computerScore = 0;
let achievementSystem;
const paddleWidth = 10;
const paddleHeight = 100;
let uiSystem;