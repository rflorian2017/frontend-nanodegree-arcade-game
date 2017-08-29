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
	this.x += this.y * Math.floor((Math.random() * 3) + 1) * dt;
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
//this is the player class
var Player = function(x,y,score) {
	Enemy.call(this,x,y);
	this.sprite = 'images/char-boy.png';
	this.score = score;
}
	
Player.prototype = Object.create(Enemy.prototype);

Player.prototype.update = function() {
	if(this.y < 10) {
		this.score ++;
		player = new Player(2,5,this.score);
	}
};

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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy_1 = new Enemy(0,1);
var enemy_2 = new Enemy(0,2);
var enemy_3 = new Enemy(0,3);
var allEnemies = [enemy_1, enemy_2, enemy_3];
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
