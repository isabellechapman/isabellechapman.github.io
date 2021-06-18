### User Story / Gameplay
- Describe the gameplay
    A ball bounces between two paddles. If a player controlling one paddle misses the ball, their opponent gains a point. The game is reset when one player gats 11 points.
- What are the conditions when the game begins? 
    The ball is at the lowest speed, the paddles are in a starting position, and both scores are 0.
- Does the game have an end? If so, what are the conditions for when it ends?
    The game ends if the point amount reaches 11.
- What `if`s will there be?
    If the ball hits a paddle, it bounces in the opposite direction.
    If the ball hits a blank wall, the player on the opposite side earns a point.
    If a player earns 11 points, the game ends and points are reset.


### Visual Game Components:
- What are the visual game components? For example, in Bouncing Box, the game components were the board and the box.
  - Which will be static? (the board)
        the walls, the board, the middle line
  - Which will be animated? (the box)
        the paddles, the ball, the scores
- What data will you need to manage each game component? For example, in Bouncing Box, the data values were `positionX`, `speedX`, and `points`.
    paddle1PositionY, paddle2PositionY, ballPositionX, ballPositionY, ballSpeedX, ballSpeedY, points1, points2

### Events / Logic 
- What events will occur in this game? (timer events, keyboard events, clicking events?)
    pressing keys
    ball hitting paddle
    ball hitting wall
- How do those events affect the data of the program?
    Pressing a key will adjust paddle1PositionY and paddle2PositionY.
    The ball hitting a paddle will adjust ballPositionX, ballPositionY, ballSpeedX, and ballSpeedY.
    The ball hitting a wall will adjust ballPositionX, ballPositionY, ballSpeedX, ballSpeedY, and points.
- For each "event", write out the high-level logic of what will happen. It is better (and tricky) to be as specific as you can while remaining high-level!
    When a certain key is pressed, a paddle can go up or down.
    When the ball hits a paddle, it bounces in another direction and its speed is increased.
    When the ball hits a wall, the ball’s position is reset, the ball’s speed is reset, and the opposite opponent gains a point.
