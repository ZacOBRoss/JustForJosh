class Ball{
    constructor(pongBoard, paddle1, paddle2) {
        this.r = 10;        
        this.height = pongBoard.boardHeight;
        this.width = pongBoard.boardWidth;
        this.canvasRef = pongBoard.canvasRef;
        this.xSpeed = 4;
        this.ySpeed = 0;
        this.x = 0;
        this.y = 0;
        this.paddle1 = paddle1;
        this.paddle2 = paddle2;
        this.p1Score = 0;
        this.p2Score = 0;
        this.reset();
    }

    updateBall() {
        if (this.y < this.r || this.y > this.height - this.r) {
            this.ySpeed = -this.ySpeed;
        }
        if (this.x < this.r) {
            this.p2Score++;
            this.reset();
        }
        else if (this.x > this.width + this.r) {
            this.p1Score++;
            this.reset();
        }

        if (this.x - this.r <= this.paddle1.x + this.paddle1.width && 
            this.x > this.paddle1.x) {
            if (this.isSameHeight(this.paddle1)) {
                this.xSpeed = -this.xSpeed;
            }
        }
        
        if (this.x + this.r >= this.paddle2.x && 
            this.x <= this.paddle2.x + this.paddle2.width) {
            if (this.isSameHeight(this.paddle2)) {
                this.xSpeed = -this.xSpeed;
            }
        }

        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    reset() {
        this.x = this.width/2;
        this.y = this.height/2;

        let isLeft = Math.random() > .5;
        if (isLeft) {
            this.xSpeed = -this.xSpeed;
        }
    }

    displayScore() {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.font = "150px Stencil";
        ctx.fillText(this.p1Score, (this.width/2 - 180), 100);
        ctx.fillText(this.p2Score, (this.width/2 + 80), 100);
    }

    displayBall() {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        this.displayScore();
    }

    isSameHeight(paddle) {
        if (this.y >= paddle.y && this.y < paddle.y + 10) {
            this.ySpeed = -4;
            return true;
        }
        else if (this.y >= paddle.y + 10 && this.y < paddle.y + 20) {
            this.ySpeed = -3;
            return true;
        }
        else if (this.y >= paddle.y + 20 && this.y < paddle.y + 30) {
            this.ySpeed = -2;
            return true;
        }
        else if (this.y >= paddle.y + 30 && this.y < paddle.y + 40) {
            this.ySpeed = -1;
            return true;
        }
        else if (this.y === paddle.y + 40) {
            this.ySpeed = 0;
            return true;
        }
        else if (this.y > paddle.y + 40 && this.y <= paddle.y + 50) {
            this.ySpeed = 1;
            return true;
        }
        else if (this.y > paddle.y + 50 && this.y <= paddle.y + 60) {
            this.ySpeed = 2;
            return true;
        }
        else if (this.y > paddle.y + 60 && this.y <= paddle.y + 70) {
            this.ySpeed = 3;
            return true;
        }
        else if (this.y > paddle.y + 70 && this.y <= paddle.y + 80) {
            this.ySpeed = 4;
            return true;
        }
        else {
            return false;
        }
    }
}

export default Ball