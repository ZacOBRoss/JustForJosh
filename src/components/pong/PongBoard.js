class PongBoard {
    constructor(canvasRef) {
        this.boardWidth = window.innerWidth - 40;
        this.boardHeight = 750;
        this.canvasRef = canvasRef;
    }

    displayBoard() {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.boardWidth, this.boardHeight);

        ctx.beginPath();
        ctx.setLineDash([20, 20]);
        ctx.moveTo(this.boardWidth / 2, 0);
        ctx.lineTo(this.boardWidth / 2, this.boardHeight);
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
    }
}

export default PongBoard