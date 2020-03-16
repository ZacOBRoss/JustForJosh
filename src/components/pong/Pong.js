import React from 'react'

import PongBoard from './PongBoard'
import Paddle from './Paddle'

const draw = (canvasRef, pongBoard, paddle1, paddle2) => {
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
}

const Pong = () => {
    const canvasRef = React.useRef(null)
    let pongBoard;
    let paddle1;
    let paddle2;
    pongBoard = new PongBoard(canvasRef);
    paddle1 = new Paddle(1, canvasRef);
    paddle2 = new Paddle(2, canvasRef);
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

    return (
        <div>
            <h1>Pong</h1>
            <button
                onClick = {() => {
                    setInterval(
                        function() {
                            draw(canvasRef, pongBoard, paddle1, paddle2)
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
                width={window.innerWidth}
                height="750"
            />

        </div>        
    )
}

export default Pong