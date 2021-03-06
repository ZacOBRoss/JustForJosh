import React from 'react'

import PongBoard from './PongBoard'
import Paddle from './Paddle'
import Ball from './Ball'

let pongBoard;
let paddle1;
let paddle2;
let ball;
let interval;

const draw = (pongBoard, paddle1, paddle2) => {
    pongBoard.displayBoard();
    paddle1.displayPaddle();
    paddle2.displayPaddle();

    if (paddle1.isUp === true) {
        paddle1.up();
    }
    else if (paddle1.isDown === true) {
        paddle1.down();
    }

    if (paddle2.isUp === true) {
        paddle2.up();
    }
    else if (paddle2.isDown === true) {
        paddle2.down();
    }

    ball.updateBall();
    ball.displayBall();
}

const Pong = () => {
    const canvasRef = React.useRef(null)    
    
    pongBoard = new PongBoard(canvasRef);
    paddle1 = new Paddle(1, canvasRef);
    paddle2 = new Paddle(2, canvasRef);
    ball = new Ball(pongBoard, paddle1, paddle2);
    document.addEventListener("keydown", (e) => {
        switch (e.keyCode) {            
            case (87):
                paddle1.isUp = true;
                paddle1.isDown = false;
                break;
            case (83):
                paddle1.isUp = false;
                paddle1.isDown = true;
                break;
            case (38):
                paddle2.isUp = true;
                paddle2.isDown = false;
                break;
            case (40):
                paddle2.isUp = false;
                paddle2.isDown = true;
                break;
            default:
                break;
        }        
    })
    document.addEventListener("keyup", (e) => {
        switch (e.keyCode) {            
            case (87):
                paddle1.isUp = false;
                break;
            case (83):
                paddle1.isDown = false;
                break;
            case (38):
                paddle2.isUp = false;
                break;
            case (40):
                paddle2.isDown = false;
                break;
            default:
                break;
        }
    })

    return (
        <div>
            <h1>Pong</h1>
            <button
                onClick = {() => {
                    if (!interval) {
                        interval = setInterval(
                            function() {
                                draw(pongBoard, paddle1, paddle2)
                            },
                             10);
                    }
                    else {
                        clearInterval(interval);
                        pongBoard = new PongBoard(canvasRef);
                        paddle1 = new Paddle(1, canvasRef);
                        paddle2 = new Paddle(2, canvasRef);
                        ball = new Ball(pongBoard, paddle1, paddle2);
                        interval = setInterval(
                            function() {
                                draw(pongBoard, paddle1, paddle2)
                            },
                             10);
                    }
                }}
            >
                New Game
            </button>
            <br />
            <br />
            <canvas 
                tabIndex = '1'
                ref={canvasRef}                 
                width={window.innerWidth}
                height="750"
            />

        </div>        
    )
}

export default Pong