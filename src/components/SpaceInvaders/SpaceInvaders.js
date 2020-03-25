import React from 'react';

import Invaders from './Invaders';

import Invader1 from './images/invader1.png';
import Shooter from './images/shooter.png';
import Player from './Player';

let interval
let invader1
let shooter
let boardWidth = 750;
let boardHeight = 750;
let alienWidth = 40;
let alienHeight = 40;
let playerWidth = 40;
let playerHeight = 30;
let player

const initialiseInvaders = (canvasRef, invader1Ref, shooterRef) => {
    invader1 = invader1Ref.current;
    shooter = shooterRef.current;

    const invaders = new Invaders(
        invader1, 
        4, 
        boardWidth, 
        boardHeight, 
        alienWidth,
        alienHeight,
        canvasRef);

    player = new Player(
        shooter,
        boardWidth,
        boardHeight,
        invaders,
        canvasRef,
        playerWidth,
        playerHeight);

    invaders.player = player;

    interval = setInterval(
            function() {
                draw(canvasRef, invaders, player)
            },
             10);
}

const draw = (canvasRef, invaders, player) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, boardWidth, boardHeight);
    
    invaders.draw();
    player.draw()
    invaders.update();
    player.update();
}

const SpaceInvaders = () => {
    const canvasRef = React.useRef(null);
    const invader1Ref = React.useRef(null);   
    const shooterRef = React.useRef(null); 
    
    document.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
            case (32):
                player.shoot();
                break;
            case (37):
                player.moveLeft();
                break;
            case (39):
                player.moveRight();
                break;
            default:
                break;
        }
    });
    document.addEventListener("keyup", (e) => {
        switch (e.keyCode) {
            case (37):
                player.isMovingLeft = false;
                break;
            case (39):
                player.isMovingRight = false;;
                break;
            default:
                break;
        }
    });

    return (
        <div>
            <h1>Space Invaders</h1>
            <button
                onClick = {() => {
                    initialiseInvaders(canvasRef, invader1Ref, shooterRef)
                    
                }}
            >
                New Game
            </button>
            <br />
            <br />
            <canvas 
                tabIndex = '1'
                ref={canvasRef}                 
                width="750"
                height="750"
            />
            <img
                alt="invader1"
                ref={invader1Ref} 
                src={Invader1}
                className="hidden"
            />
            <img
                alt="shooter"
                ref={shooterRef} 
                src={Shooter}
                className="hidden"
            />
        </div>
    )
}

export default SpaceInvaders