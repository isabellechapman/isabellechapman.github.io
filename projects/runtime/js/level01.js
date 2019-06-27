var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'red',x:600,y:groundY},
                {type: 'orange',x:800,y:groundY},
                {type: 'silver',x:1200,y:groundY},
                {type: 'orange',x:1350,y:groundY},
                {type: 'blue',x:1900,y:groundY},
                {type: 'red',x:1800,y:groundY},
                {type: 'blue',x:2300,y:groundY},
                {type: 'silver',x:2400,y:groundY}
            ],
            enemies: [
                {type: 'helicopter',x:2000,y:groundY - 50,speed:5},
                {type: 'helicopter',x:3200,y:groundY - 50,speed:5},
                {type: 'helicopter',x:4700,y:groundY - 50,speed:5},
                {type: 'helicopter',x:24000,y:groundY - 50,speed:20}
            ],
            rewards: [
                {type: 'coin',x:900,y:groundY - 150,speed:2},
                {type: 'coin',x:1575,y:groundY - 150,speed:2},
                {type: 'coin',x:2175,y:groundY - 150,speed:2},
                {type: 'coin',x:2600,y:groundY - 150,speed:2},
                {type: 'coin',x:2650,y:groundY - 150,speed:2},
                {type: 'coin',x:2700,y:groundY - 150,speed:2},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        function createOrangeCar(x,y) {
            var hitZoneSize = 15; //370
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/orangeCar.png');
            myObstacle.scaleX = .03;
            myObstacle.scaleY = .03;
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -800;
            obstacleImage.y = -500;
        }
        function createSilverCar(x,y) {
            var hitZoneSize = 15; //150
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/silverCar.png');
            myObstacle.scaleX = .07;
            myObstacle.scaleY = .07;
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -550;
            obstacleImage.y = -250;
        }
        function createRedCar(x,y) {
            var hitZoneSize = 15; //100
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/redCar.png');
            myObstacle.scaleX = .1;
            myObstacle.scaleY = .1;
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -350; //350
            obstacleImage.y = -150;
        }
        function createBlueCar(x,y) {
            var hitZoneSize = 15; //340
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/blueCar.png');
            myObstacle.scaleX = .03;
            myObstacle.scaleY = .03;
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -12000; //950
            obstacleImage.y = -300;
        }
        for (var t9 = 0; t9 < levelData.gameItems.length; t9++) {
            var gameItemX = levelData.gameItems[t9].x;
            var gameItemY = levelData.gameItems[t9].y;
            if (levelData.gameItems[t9].type === "orange") {
                createOrangeCar(gameItemX, gameItemY);
            } else if (levelData.gameItems[t9].type === "silver") {
                createSilverCar(gameItemX, gameItemY);
            } else if (levelData.gameItems[t9].type === "red") {
                createRedCar(gameItemX, gameItemY);
            } else if (levelData.gameItems[t9].type === "blue") {
                createBlueCar(gameItemX, gameItemY);
            }
        }
        function createEnemy(x, y, speed) {
            var enemy =  game.createGameItem('enemy',13);
            var helicopter = draw.bitmap('img/helicopter.png');
            helicopter.x = -280;
            helicopter.y = -170;
            enemy.addChild(helicopter);
            enemy.x = x;
            enemy.y = y;
            enemy.scaleX = .18;
            enemy.scaleY = .18;
            game.addGameItem(enemy);
            enemy.velocityX =-speed;
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-20);
            };
            enemy.onProjectileCollision = function() {
                game.increaseScore(1000);
                enemy.fadeOut();
            };
        }
        for (var t11 = 0; t11 < levelData.enemies.length; t11++) {
            var enemyX = levelData.enemies[t11].x;
            var enemyY = levelData.enemies[t11].y;
            var sanic = levelData.enemies[t11].speed;
            createEnemy(enemyX, enemyY, sanic);
        }
        function createReward(x, y, speed) {
            var reward = game.createGameItem('reward',11);
            var coin = draw.bitmap('img/coin.png');
            coin.x = -280;
            coin.y = -250;
            reward.addChild(coin);
            reward.x = x;
            reward.y = y;
            reward.scaleX = .07;
            reward.scaleY = .07;
            reward.velocityX =-speed;
            game.addGameItem(reward);
            reward.onPlayerCollision = function() {
                game.increaseScore(1000);
                reward.shrink();
            };
        }
        for (var t14 = 0; t14 < levelData.rewards.length; t14++) {
            var rewardX = levelData.rewards[t14].x;
            var rewardY = levelData.rewards[t14].y;
            var sonic = levelData.rewards[t14].speed;
            createReward(rewardX, rewardY, sonic);
        }
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}