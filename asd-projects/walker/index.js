/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var positionXOne = 100; // the x-coordinate location for the first box
  var speedXOne = 0; // the speed for the first box along the x-axis
  var positionYOne = 100; // the y-coordinate location for the first box
  var speedYOne = 0; //the speed of the first box along the y-axis
  var positionXTwo = 290; // the x-coordinate location for the second box
  var speedXTwo = 0; // the speed for the second box along the x-axis
  var positionYTwo = 290; // the y-coordinate location for the second box
  var speedYTwo = 0; //the speed of the second box along the y-axis


  
  // Game Item Objects
  var KEY = {
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
    "A": 65,
    "W": 87,
    "D": 68,
    "S": 83
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // registers an event if a key is pressed
  $(document).on('keyup', handleKeyUp);                               // registers an event is a key is released

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionBox()
    redrawBox()
  }
  
  /* 
  Called in response to events.
  */

  // tells box what to do when key is pressed
  function handleKeyDown(event) {

    // speed changes for the first box when a key is pressed
    if (event.which === KEY.LEFT) {
      speedXOne = -5;
    }
    else if (event.which === KEY.UP) {
      speedYOne = -5;
    }
    else if (event.which === KEY.RIGHT) {
      speedXOne = 5;
    }
    else if (event.which === KEY.DOWN) {
      speedYOne = 5;
    }

    // speed changes for the second box when a key is pressed
    if (event.which === KEY.A) {
      speedXTwo = -5;
    }
    else if (event.which === KEY.W) {
      speedYTwo = -5;
    }
    else if (event.which === KEY.D) {
      speedXTwo = 5;
    }
    else if (event.which === KEY.S) {
      speedYTwo = 5;
    }

  }

  // tells box what to do when key is released
  function handleKeyUp(event) {

    //speed changes for the first box when a key is released
    if (event.which === KEY.LEFT) {
      speedXOne = 0;
    }
    else if (event.which === KEY.UP) {
      speedYOne = 0;
    }
    else if (event.which === KEY.RIGHT) {
      speedXOne = 0;
    }
    else if (event.which === KEY.DOWN) {
      speedYOne = 0;
    }

    // speed changes for the second box when a key is released
    if (event.which === KEY.A) {
      speedXTwo = 0;
    }
    else if (event.which === KEY.W) {
      speedYTwo = 0;
    }
    else if (event.which === KEY.D) {
      speedXTwo = 0;
    }
    else if (event.which === KEY.S) {
      speedYTwo = 0;
    }

  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionBox() {

    //repositioning for the first box
    positionXOne += speedXOne; // update the position of the box along the x-axis
    positionYOne += speedYOne; //update the position of the box along the y-axis
    if (positionXOne >= 390) { //prevents box from leaving the left of the board
      positionXOne = 390;
    }
    else if (positionXOne <= 0) { //prevents box from leaving the right of the board
      positionXOne = 0;
    }
    if (positionYOne >= 390) { //prevents box from leaving the bottom of the board
      positionYOne = 390;
    }
    else if (positionYOne <= 0) { //prevents box from leaving the top of the board
      positionYOne = 0;
    }

    //repositioning for the second box
    positionXTwo += speedXTwo; // update the position of the box along the x-axis
    positionYTwo += speedYTwo; //update the position of the box along the y-axis
    if (positionXTwo >= 390) { //prevents box from leaving the left of the board
      positionXTwo = 390;
    }
    else if (positionXTwo <= 0) { //prevents box from leaving the right of the board
      positionXTwo = 0;
    }
    if (positionYTwo >= 390) { //prevents box from leaving the bottom of the board
      positionYTwo = 390;
    }
    else if (positionYTwo <= 0) { //prevents box from leaving the top of the board
      positionYTwo = 0;
    }

  }

  function redrawBox() {
    $("#boxOne").css("left", positionXOne);    // draw the first box in the new location, positionX pixels away from the "left"
    $("#boxOne").css("top", positionYOne);    // draw the first box in the new location, positionY pixels away from the "top"
    $("#boxTwo").css("left", positionXTwo);    // draw the first box in the new location, positionX pixels away from the "left"
    $("#boxTwo").css("top", positionYTwo);    // draw the first box in the new location, positionY pixels away from the "top"
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
