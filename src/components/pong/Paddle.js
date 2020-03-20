class Paddle {
    constructor(player, canvasRef) {
        this.x = player === 1 ? 20 : (window.innerWidth - 80);
        this.y = 335;
        this.height = 80;
        this.width = 20;
        this.canvasRef = canvasRef;
        this.isUp = false;
        this.isDown = false;
    }

    displayPaddle() {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.closePath();
    }

    up() {
        if (this.y > 0) {
            this.y -= 2.5;
        }        
    }

    down() {
        if (this.y < 670) {
            this.y += 2.5;
        }        
    }
}

export default Paddle