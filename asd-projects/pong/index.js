/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var ball = information("#ball");
  var paddle1 = information("#paddle1");
  var paddle2 = information("#paddle2");
  var board = information ("#board");
  var score1 = information("#score1");
  var score2 = information("#score2");

  var text1 = 0;
  var text2 = 0;
  var pointTotal1 = 0;
  var pointTotal2 = 0;
  var maxX = board.width - ball.width;
  var maxY = board.height - ball.height;
  var startingX = 709;
  var startingY = 316;
  ball.speedX = 5 * positiveOrNegative();
  ball.speedY = 4 * positiveOrNegative();

  // Game Item Objects
  var key = {
    "up": 38,
    "down": 40,
    "w": 87,
    "s": 83
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // registers an event if a key is pressed
  $(document).on('keyup', handleKeyUp);                               // registers an event if a key is released

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    handleGameItemMovement();
    redrawGameItem();
    winner();
  }
  
  /* 
  Called in response to events.
  */

  // tells the paddles what to do when a key is pressed
  function handleKeyDown(event) {

    // speed changes for the first paddle when a key is pressed
    if (event.which === key.w) {
      paddle1.speedY = -5;
    }
    if (event.which === key.s) {
      paddle1.speedY = 5;
    }

    // speed changes for the second paddle when a key is pressed
    if (event.which === key.up) {
      paddle2.speedY = -5;
    }
    if (event.which === key.down) {
      paddle2.speedY = 5;
    }
  }

  // tells the paddles what to do when a key is released
  function handleKeyUp(event) {
    // speed changes for the first paddle when a key is pressed
    if (event.which === key.w) {
      paddle1.speedY = 0;
    }
    if (event.which === key.s) {
      paddle1.speedY = 0;
    }

    // speed changes for the second paddle when a key is pressed
    if (event.which === key.up) {
      paddle2.speedY = 0;
    }
    if (event.which === key.down) {
      paddle2.speedY = 0;
    }

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // allows access to information in the css file
  function information (id) {
    return {
      id: id,
      x: parseFloat($(id).css("left")),
      y: parseFloat($(id).css("top")),
      width: $(id).width(),
      height: $(id).height(),
      speedX: 0,
      speedY: 0,
      html: $(id).html(),
    };
  }

  function handleGameItemMovement() {

    // reposition the ball
    ball.x += ball.speedX;                    // update the position of the ball along the x-axis
    ball.y += ball.speedY;                    // update the position of the ball along the y-axis
    if (ball.y >= maxY) {                     // prevents the ball from leaving the bottom of the board
      ball.y -= ball.speedY;
      ball.speedY *= -1;
    }
    else if (ball.y <= 0) {                   // prevents the ball from leaving the top of the board
      ball.y -= ball.speedY;
      ball.speedY *= -1;
    }
    if (ball.x >= maxX) {                     // controls what happens when the ball hits the right wall
      ball.x = startingX;
      ball.y = startingY;
      ball.speedX = 7 * positiveOrNegative();
      ball.speedY = 5 * positiveOrNegative();
      pointTotal1 += 1;
      console.log(pointTotal1);
      $("#points1").text(text1 += 1);
    }
    else if (ball.x <= 0) {                   // controls what happens when the ball hits the left wall
      ball.x = startingX;
      ball.y = startingY;
      ball.speedX = 7 * positiveOrNegative();
      ball.speedY = 5 * positiveOrNegative();
      pointTotal2 += 1;
      console.log(pointTotal2);
      $("#points2").text(text2 += 1);
    }

    // reposition the first paddle
    paddle1.y += paddle1.speedY;              // update the position of the first paddle
    if (paddle1.y >= 350) {                   // prevents the first paddle from leaving the bottom of the board
      paddle1.y = 350;
    }
    else if (paddle1.y <= 0) {                // prevents the paddle from leaving the top of the board
      paddle1.y = 0;
    }
    if (doCollide(paddle1, ball) === true) {  // changes speed of the ball if it collides with the first paddle
      ball.x -= ball.speedX;
      ball.speedX *= -1;
      ball.speedX += (2 + Math.random());
      ball.speedY += 2;
    };
    
    // reposition the second paddle
    paddle2.y += paddle2.speedY;              // update the position of the second paddle
    if (paddle2.y >= 350) {                   // prevents the second paddle fro leaving the bottom of the board
      paddle2.y = 350;
    }
    else if (paddle2.y <= 0) {                // prevents the second paddle from leaving the top of the board
      paddle2.y = 0;
    }
    if (doCollide(paddle2, ball) === true) {  // changes speed of the ball if it collides with the first paddle
      ball.x -= ball.speedX;
      ball.speedX *= -1;
      ball.speedX -= (2 + Math.random());
      ball.speedY += 2;
    };
  }

  function redrawGameItem() {
    $(ball.id).css("top", ball.y);          // draw the ball in the new location, y pixels away from the "top"
    $(ball.id).css("left", ball.x);         // draw the ball in the new location, x pixels away from the "left"
    $(paddle1.id).css("top", paddle1.y);    // draw the first paddle in the new location, y pixels away from the "top"
    $(paddle2.id).css("top", paddle2.y);    // draw the second paddle in the new location, y pixels away from the "top"
  }

  // randomly creates a 1 or a -1
  function positiveOrNegative() {
    var num = Math.round(Math.random()) * 2 - 1;
    return num;
  }

  // determines if the ball collides with a paddle
  function doCollide(paddle, ball) {
    // variable reassignments for the paddles
    paddle.leftX = paddle.x;
    paddle.topY = paddle.y;
    paddle.rightX = paddle.x + paddle.width;
    paddle.bottomY = paddle.y + paddle.height;
    
    // variable reassignments for the ball
    ball.leftX = ball.x;
    ball.topY = ball.y;
    ball.rightX = ball.x + ball.width;
    ball.bottomY = ball.y + ball.height;

    if (paddle.leftX < ball.rightX && paddle.rightX > ball.leftX && paddle.topY < ball.bottomY && paddle.bottomY > ball.topY) {
      return true;
    }
    else {
      return false;
    }
  }

  // determines when a player wins and notifies them
  function winner() {
    if (pointTotal1 >= 11) {
      ball.speedX = 0;
      ball.speedY = 0;
      $("#endMessage").text("Player 1 wins! Refresh to play again.");
    }
    if (pointTotal2 >= 11) {
      ball.speedX = 0;
      ball.speedY = 0;
      $("#endMessage").text("Player 2 wins! Refresh to play again.");
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
