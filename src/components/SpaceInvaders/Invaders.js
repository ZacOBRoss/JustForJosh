import Alien from "./Alien";
import AlienBullet from './AlienBullet'

class Invaders {
    constructor(
        alienImage, 
        rowsCount, 
        boardWidth, 
        boardHeight,
        alienWidth,
        alienHeight,
        canvasRef) {
            this.alienImage = alienImage;
            this.rowsCount = rowsCount;
            this.direction = 0;
            this.y = 40;        
            this.bullets = [];
            this.boardWidth = boardWidth;
            this.boardHeight = boardHeight;
            this.alienWidth = alienWidth;
            this.alienHeight = alienHeight;
            this.canvasRef = canvasRef;
            this.aliens = this.initialiseAliens();
            this.player = 0;

            this.speed = 0.2;

            this.timeSinceLastBullet = 0;
    }

    initialiseAliens() {
        let aliens = []
        let y = 80;
        for (let i = 0; i < this.rowsCount; i++) {
            for (let x = 100; x < this.boardWidth - 100; x += (this.alienWidth + 10)) {
                aliens.push(new Alien(
                    x, 
                    y, 
                    this.alienImage,
                    this.canvasRef,
                    this.alienWidth,
                    this.alienHeight));
            }
            y += this.alienHeight + 30;
        }
        return aliens;
    }

    draw() {
        for (let bullet of this.bullets) {
            bullet.draw();
        }
        for (let alien of this.aliens) {
            alien.draw();
        }
    }

    update() {
        for (let alien of this.aliens) {
            if (this.direction === 0) {
                alien.x += this.speed;
            }
            else if (this.direction === 1) {
                alien.x -= this.speed;
            }
        }

        if (this.hasChangedDirection()) {
            this.moveAlienDown();
        }

        if (this.aliens.length === 0) {
            this.nextLevel();
        }

        if (this.timeSinceLastBullet >= 40) {
            let bottomAliens = this.getBottomAliens();

            if (bottomAliens.length) {
                this.makeABottomAlienShoot(bottomAliens);
            }
        }
        this.timeSinceLastBullet++;

        this.updateBullets();
    }

    hasChangedDirection() {
        for (let alien of this.aliens) {
            if (alien.x >= this.boardWidth - 60) {
                this.direction = 1;
                return true;
            }
            else if (alien.x <= 20) {
                this.direction = 0;
                return true;
            }
        }
        return false;
    }

    moveAlienDown() {
        for (let alien of this.aliens) {
            alien.y += 10;
        }
    }

    checkCollision(x, y) {
        for (let i = this.aliens.length - 1; i >= 0; i--) {
            let currentAlien = this.aliens[i];

            var dist = () => {
                var xDist = (x - (currentAlien.x + (this.alienWidth/2)));
                var yDist = (y - (currentAlien.y + (this.alienHeight/2)));

                return Math.sqrt((xDist * xDist) + (yDist * yDist));
            }

            if (dist < 20) {
                this.aliens.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    getBottomAliens() {
        let allXPositions = this.getAllXPositions();

        let aliensAtTheBottom = [];
        for (let alienAtX of allXPositions) {
            let bestYPosition = 0;
            let lowestAlien;

            for (let alien of this.aliens) {
                if (alien.x === alienAtX) {
                    if (alien.y > bestYPosition) {
                        bestYPosition = alien.y;
                        lowestAlien = alien;
                    }
                }
            }
            aliensAtTheBottom.push(lowestAlien);
        }

        return aliensAtTheBottom;
    }

    nextLevel() {
        this.speed += 0.5;
        this.aliens = this.initialiseAliens();
    }

    getAllXPositions() {
        let allXPositions = new Set();
        for (let alien of this.aliens) {
            allXPositions.add(alien.x);
        }
        return allXPositions;
    }

    makeABottomAlienShoot(bottomAliens) {
        let shootingAlien = 
        bottomAliens[Math.floor(Math.random() * bottomAliens.length)];

        const bullet = new AlienBullet(
            (shootingAlien.x + 20), 
            (shootingAlien.y + 20),
            this.canvasRef);

        this.bullets.push(bullet);
        this.timeSinceLastBullet = 0;
    }

    updateBullets() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            this.bullets[i].y += 2;

            if (this.hasHitPlayer(this.bullets[i])){
                this.bullets.splice(i, 1);
                break;
            }
            else if (this.bullets[i].isOffScreen()) {
                this.bullets.splice(i, 1);
                break;
            }
        }
    }

    hasHitPlayer(bullet) {
        return this.player.checkCollision(bullet.x, bullet.y);
    }
}

export default Invaders