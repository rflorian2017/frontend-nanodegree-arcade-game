// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x = x * 100;
	this.y = y * 73;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	
	//use the Math.random to generate a number between 1 and 3 to reset the position, and use floor to have an integer value
	this.x += this.y * Math.floor((Math.random() * 3) + 1) * dt;
	
	//if enemy is outside the screen, reset its position
	if(this.x > 505) {
		this.x = 0;
		this.y = Math.floor((Math.random() * 3) + 1) * 70;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//this is the player class, which is a subclass of Enemy, but with another sprite
var Player = function(x,y,score) {
	Enemy.call(this,x,y);
	this.sprite = 'images/char-boy.png';
	this.score = score;
}

//inherit the render function	
Player.prototype = Object.create(Enemy.prototype);

//update is required to have no parameters, because it is not moving randomly, but using the keyboard
Player.prototype.update = function() {
	if(this.y < 10) {
		this.score ++;
		player = new Player(2,5,this.score);
	}
};

//reset the player in case of the collision with an enemy
Player.prototype.reset = function() {
	player = new Player(2,5,player.score-1);
};

//update the score when collecting an item
Player.prototype.updateScore = function() {
	this.score += 10;
};

//this function handles the input from the keyboard. And it updates the coordinates dependend on the keys
Player.prototype.handleInput = function(key) {
	switch(key) {
		case 'left' : {
			if (this.x > 0) 
				this.x = this.x - 100;
		break;
		}
		
		case 'up' : {
			if (this.y > 0) 
				this.y = this.y - 75;
		break;
		}
		
		case 'right' : {
			if (this.x < 400) 
				this.x = this.x + 100;
		break;
		}
		
		case 'down' : {
			if (this.y < 350) 
				this.y = this.y + 75;
		break;
		}
	} 
};

//create a collectible object, subclass of Enemy, which has the same parameters as the Enemy and has a different sprite
var Collectible = function(x,y,sprite) {
	Enemy.call(this,x,y);
	this.sprite = sprite;
}

//inherit the render method
Collectible.prototype = Object.create(Enemy.prototype);

// Update the collectible's position, required method for game, the difference is the collectible is moving vertically
// Parameter: dt, a time delta between ticks
Collectible.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.y += (this.x + 20) * Math.floor((Math.random() * 3) + 1) * dt;
	
	//if outside the screen, then set the x to outside the canvas
	if(this.y > 400) {
		this.x = 800;
	}
	
	//delay the collectibles to come more rarely, by waiting for the y to increment until a bigger value`
	if(this.y > 30000) {
		this.y = 0;
		this.x = Math.floor((Math.random() * 5) + 1) * 70;
	}
};

//update collectible is needed in case of collecting from the player
Collectible.prototype.updateCollectible = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x = 800;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy_1 = new Enemy(0,1);
var enemy_2 = new Enemy(0,2);
var enemy_3 = new Enemy(0,3);
var allEnemies = [enemy_1, enemy_2, enemy_3];

//instantiate the collectible items
var collectible1 = new Collectible(0,0,'images/Gem Blue.png');
var collectible2 = new Collectible(1,0,'images/Gem Green.png');
var collectible3 = new Collectible(2,0,'images/Gem Orange.png');
var collectibleItems = [collectible1, collectible2, collectible3];

// Place the player object in a variable called player
var player = new Player(2,5,0);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
