class Board {
    constructor(
        canvasRef,         
        canvasWidth,
        canvasHeight,
        boardWidth, 
        boardHeight, 
        boardWidthPx, 
        boardHeightPx
    ) {
        this.canvasRef = canvasRef;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.board = [];
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.boardWidthPx = boardWidthPx;
        this.boardHeightPx = boardHeightPx;
        this.cellWidth = (boardWidthPx / boardWidth);
        this.cellHeight = (boardHeightPx / boardHeight);
        this.boardStartX = (canvasWidth - (2 * boardWidthPx)) / 2;
        this.boardStartY = (canvasHeight - boardHeightPx) / 2;
        this.initialiseBoard();
        
        this.rowsToRemove = [];
        this.Score = 0;
    }

    initialiseBoard = () => {
        var row = [this.boardWidth];
        row.forEach(populateRow = (item, index) => {
            row[index] = 0;
        });
        this.board.forEach(populateBoard = (item, index) => {
            this.board[index] = row;
        });

    }

    update = () => {
        this.rowsToRemove = [];
        for (var i = 0; i < this.boardHeight; i ++) {
            var row = this.boardHeight[i];
            var total = 0;
            for (var j = 0; j < this.boardWidth; j++) {
                var cell = row[j];
                if (cell === 1) {
                    total++;
                }
            }
            if (total === 10) {
                rowsToRemove.push(i);
            }
        }
    }

    draw = () => {
        for (var i = 0; i < this.boardHeight; i++) {
            for (var j = 0; j < this.boardWidth; j++) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
                switch (this.board[i][j]) {
                    case 1:
                        ctx.fillStyle = "black";
                        break;
                    default:
                        ctx.fillStyle = "white";
                }
                ctx.fillRect(
                    this.boardStartX + (i * this.cellWidthPx),
                    this.boardStartY + (j * this.cellHeight),
                    this.cellWidth,
                    this.cellHeight
                );
            }
        }
    }
}

export default Board