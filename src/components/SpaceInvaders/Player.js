import PlayerBullet from './PlayerBullet'

class Player {
    constructor(
        shooterImage, 
        boardWidth, 
        boardHeight, 
        invaders, 
        canvasRef,
        playerWidth,
        playerHeight) {
        this.image = shooterImage;
        this.x = boardWidth/2;
        this.y = boardHeight - 40;
        this.invaders = invaders;
        this.canvasRef = canvasRef;
        this.playerWidth = playerWidth;
        this.playerHeight = playerHeight;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;

        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.bullets = [];
    }

    update() {
        if (this.isMovingRight) {
            this.x += 2;
        }
        else if (this.isMovingLeft) {
            this.x -= 2;
        }

        this.constrain();

        this.updateBullets();
    }

    updateBullets() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            this.bullets[i].update();

            if (this.hasHitAlien(this.bullets[i])){
                this.bullets.splice(i, 1);
                break;
            }
            else if (this.bullets[i].isOffScreen()) {
                this.bullets.splice(i, 1);
                break;
            }
        }
    }

    hasHitAlien(bullet) {
        return this.invaders.checkCollision(bullet.x, bullet.y);
    }

    constrain() {
        if (this.x <= 0) {
            this.x = 0;
        }
        else if (this.x >= this.boardWidth - 40) {
            this.x = this.boardWidth - 40;
        }
    }

    draw() {
        var canvas = this.canvasRef.current;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(
            this.image, 
            this.x, 
            this.y, 
            this.playerWidth, 
            this.playerHeight);

        this.drawBullets();
    }

    drawBullets() {
        for (let bullet of this.bullets) {
            bullet.draw();
        }
    }

    moveLeft() {
        this.isMovingLeft = true;
        this.isMovingRight = false;
    }

    moveRight() {
        this.isMovingRight = true;
        this.isMovingLeft = false;
    }

    shoot() {
        this.bullets.push(new PlayerBullet(this.x + 20, this.y, this.canvasRef));
    }

    checkCollision(x, y) {
        var dist = () => {
            var xDist = (x - (this.x + (this.playerWidth/2)));
            var yDist = (y - (this.y + (this.playerHeight/2)));

            return Math.sqrt((xDist * xDist) + (yDist * yDist));
        }

        if (dist < 20) {
            return true;
        }
        else {
            return false;
        }        
    }
}

export default Player