import React from 'react'

import Board from './Board'

let canvasWidth = 830;
let canvasHeight = 830;
let boardWidthPx = 400;
let boardHeightPx = 800;
let boardWidth = 10;
let boardHeight = 20;
let cellWidth = (boardWidthPx / boardWidth);
let cellHeight = (boardHeightPx / boardHeight);
let boardStartX = (canvasWidth - (2 * boardWidthPx)) / 2;
let boardStartY = (canvasHeight - boardHeightPx) / 2;
let interval;

const draw = (canvasRef) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#cccccc";
    ctx.fillRect(
        boardStartX,
        boardStartY,
        boardWidthPx,
        boardHeightPx
    );
    
    for (var i = 0; i < boardHeight; i++) {
        ctx.moveTo(boardStartX, boardStartY + (i * cellHeight));
        ctx.lineTo(boardStartX + boardWidthPx, boardStartY + (i * cellHeight));
    }
    for (i = 0; i < boardWidth; i++) {
        ctx.moveTo(boardStartX + (i * cellWidth), boardStartY);
        ctx.lineTo(boardStartX + (i * cellWidth), boardStartY + boardHeightPx);
    }
    ctx.strokeStyle = "#bfbfbf";
    ctx.stroke();
    ctx.fillStyle = "#666666";
    ctx.fillRect(
        (canvasWidth / 2),
        (canvasHeight - boardHeightPx) / 2,
        boardWidthPx,
        boardHeightPx / 2
    );

    const board = new Board(
        canvasRef, 
        canvasWidth,
        canvasHeight,
        boardWidth, 
        boardHeight, 
        boardWidthPx, 
        boardHeightPx
    )
    board.draw();
}

const Tetris = () => {
    const canvasRef = React.useRef(null);

    return (
        <div>
            <h1>Tetris</h1>
            <button
                onClick = {() => {
                    interval = setInterval(
                        function() {
                            draw(canvasRef)
                        },
                        10);
                }}
            >
                New Game
            </button>
            <br />
            <br />
            <canvas 
                tabIndex = '1'
                ref={canvasRef}                 
                width={canvasWidth}
                height={canvasHeight}
            />
        </div>
    )
}

export default Tetris