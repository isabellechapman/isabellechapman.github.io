var background = function (window) {
    'use strict';
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        var tree;
        var mountains = [];
        var skylines = [];
        // ANIMATION VARIABLES HERE:
        
        
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = (ground.y);

            background.removeAllChildren();

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'#0e0a84');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var sky = draw.bitmap('img/clouds.jpg');
            sky.x = 0;
            sky.y = 0; //-690
            sky.scaleX = 1;
            sky.scaleY = 1;
            background.addChild(sky);
            
            var white = draw.bitmap('img/white.jpg');
            white.x = 0;
            white.y = groundY;
            white.scaleX = 1;
            white.scaleY = 1;
            background.addChild(white);
            
            function longRoad(n) {
                var road = draw.bitmap('img/road.jpg');
                road.x = n;
                road.y = groundY;
                road.scaleX = .1;
                road.scaleY = .1;
                background.addChild(road);
            }
            for (var i = 0; i < 2000; i+=10) {
                longRoad(i)
            }
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?     A: The trees need to be in front of the buildings.
            var mountainY = groundY - 200;
            for (var m1 = 0; m1 <=3880; m1+=650) {
                var mountain = draw.bitmap('img/mountains.1.png');
                mountain.x = m1;
                mountain.y = mountainY;
                mountain.scaleX = .7;
                mountain.scaleY = .7;
                background.addChild(mountain);
                mountains.push(mountain);
            }
            for (var m2 = 325; m2 <=3880; m2+=650) {
                var mountain = draw.bitmap('img/mountains.2.png');
                mountain.x = m2;
                mountain.y = mountainY;
                mountain.scaleX = .7;
                mountain.scaleY = .7;
                background.addChild(mountain);
                mountains.push(mountain);
            }
            
            // TODO 4: Part 1 - Add a tree
            var skylineY = groundY - 443;
            
            for (var s1 = 0; s1 <=3140; s1+=1520) {
                var skyline = draw.bitmap('img/skyline.1.png');
                skyline.x = s1;
                skyline.y = skylineY;
                skyline.scaleX = 1.2;
                skyline.scaleY = 1.2;
                background.addChild(skyline);
                skylines.push(skyline);
            }
            for (var s2 = 765; s2 <=3140; s2+=1520) {
                var skyline = draw.bitmap('img/skyline.2.png');
                skyline.x = s2;
                skyline.y = skylineY;
                skyline.scaleX = 1.2;
                skyline.scaleY = 1.2;
                background.addChild(skyline);
                skylines.push(skyline);
            }
        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            for (var i = 0; i < skylines.length; i++){
                skylines[i].x = skylines[i].x - .4;
                if(skylines[i].x < -1520) {
                    skylines[i].x = canvasWidth;
                }
            }
            // TODO 5: Part 2 - Parallax
            for (var i = 0; i < mountains.length; i++){
                mountains[i].x = mountains[i].x - .2;
                if(mountains[i].x < -970) {
                    mountains[i].x = canvasWidth;
                }
            }
        }
     
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
