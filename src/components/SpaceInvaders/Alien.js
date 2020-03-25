class Alien {
    constructor(x, y, image, canvasRef, alienWidth, alienHeight) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.canvasRef = canvasRef;
        this.alienWidth = alienWidth;
        this.alienHeight = alienHeight;
    }

    draw() {
        var canvas = this.canvasRef.current;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(
            this.image, 
            this.x, 
            this.y, 
            this.alienWidth, 
            this.alienHeight);
    }
}

export default Alien