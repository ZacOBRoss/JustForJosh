class Bullet {
    constructor(x, y, canvasRef) {
        this.x = x;
        this.y = y;
        this.canvasRef = canvasRef;
    }

    draw() {
        var canvas = this.canvasRef.current;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, 3, 10);
    }

    isOffScreen() {
        if (this.y <= 0 || this.y >= 750) {
            return true;
        }
        else {
            return false;
        }
    }
}

export default Bullet