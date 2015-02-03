var ENEMY_SHIFT = 68,
    ROW_HEIGHT = 80;

// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = Math.floor(Math.random() * 3) * ROW_HEIGHT + ENEMY_SHIFT;
    this.speed = Math.floor(Math.random() * 200) + 100;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.width;
    this.height;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    /* If the enemy goes off the right most side of the canvas,
     * reset it's position at a randgom negative position off
     * the left side of the canvas.
     */
    if (this.x > this.stageWidth) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    var img = Resources.get(this.sprite);

    ctx.drawImage(img, this.x, this.y);

    if (typeof this.width === 'undefined') {
        this.width = img.width;
    }

    if (typeof this.height === 'undefined') {
        this.height = img.height;
    }

    if (typeof this.stageHeight === 'undefined') {
        this.stageHeight = ctx.canvas.height;
    }

    if (typeof this.stageWidth === 'undefined') {
        this.stageWidth = ctx.canvas.width;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.characterImages = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
    this.x = 200;
    this.y = 410;
    this.position = 0;
    this.width;
    this.height;
    this.stageWidth;
    this.stageHeight;
    this.immune = false;
}

Player.prototype.update = function (dt) {

};

Player.prototype.render = function () {
    var img = Resources.get(this.sprite);
    ctx.drawImage(img, this.x, this.y);

    if (typeof this.width === 'undefined') {
        this.width = img.width;
    }

    if (typeof this.height === 'undefined') {
        this.height = img.height;
    }

    if (typeof this.stageHeight === 'undefined') {
        this.stageHeight = ctx.canvas.height;
    }

    if (typeof this.stageWidth === 'undefined') {
        this.stageWidth = ctx.canvas.width;
    }
};

Player.prototype.getCharacterImage = function (value) {
    return this.characterImages[value];
}

function increaseCountOfEnemies(value, player) {
    if (value && allEnemies.length < 10) {
        allEnemies.push(new Enemy());
    } else if (!value && allEnemies.length > 1) {
        allEnemies.shift();
    }

    player.changeAvatar(Math.floor(allEnemies.length / 2));
}
Player.prototype.handleInput = function (key) {
    if (key === 'right') {
        if (this.x < this.stageWidth - this.width * 2) {
            this.x += this.width;
        }
    } else if (key === 'left') {
        if (this.x > 0) {
            this.x -= this.width;
        }
    } else if (key === 'up') {
        if (this.y > 0) {
            this.y -= Math.floor(this.height / 2);
        } else {
            this.reset(true);
            increaseCountOfEnemies(true, this);
        }
    } else if (key === 'down') {
        if (this.y < this.stageHeight - this.height * 1.5) {
            this.y += Math.floor(this.height / 2);
        }
    }
};

Player.prototype.changeAvatar = function(value) {
    this.sprite = this.getCharacterImage(value);
}

Player.prototype.reset = function (value) {
    this.x = 200;
    this.y = 410;

    if (!value) {
        increaseCountOfEnemies(false, this);
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
