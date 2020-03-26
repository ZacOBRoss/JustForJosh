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
let invaders
let player
let score = 0;
let lives = 3;
let highScore = 0;

const initialiseInvaders = (canvasRef, invader1Ref, shooterRef) => {
    invader1 = invader1Ref.current;
    shooter = shooterRef.current;

    invaders = new Invaders(
        invader1, 
        4, 
        boardWidth, 
        boardHeight, 
        alienWidth,
        alienHeight,
        canvasRef,
        lives);

    player = new Player(
        shooter,
        boardWidth,
        boardHeight,
        invaders,
        canvasRef,
        playerWidth,
        playerHeight,
        score);

    invaders.player = player;

    interval = setInterval(
            function() {
                if (invaders) {
                    lives = invaders.lives;
                }
                if (player) {
                    score = player.score;
                    if (score > highScore) {
                        highScore = score;
                    }
                }
                draw(canvasRef, invaders, player)
            },
             10);
}

const draw = (canvasRef, invaders, player) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, boardWidth, boardHeight);
    ctx.font = "30px Stencil";
    ctx.fillStyle = "white";
    ctx.fillText('SCORE: ' + score, 5, 30);
    ctx.fillText('HIGHSCORE: ' + highScore, boardWidth/2 - 150, 30);
    ctx.fillText('LIVES: ', boardWidth - 250, 30);
    for (let i = lives; i > 0; i--) {
        ctx.drawImage(
            shooter, 
            boardWidth - (200 - ((playerWidth + 10) * i)), 
            5,
            playerWidth,
            playerHeight)
    }
    
    invaders.draw();
    player.draw()
    invaders.update();
    player.update();

    if (lives <= 0) {
        clearInterval(interval);
        ctx.fillStyle = "black";
        ctx.fillRect(
            boardWidth / 4, 
            boardHeight / 4, 
            boardWidth / 2, 
            boardHeight / 4);
        ctx.fillStyle = "lime green";
        ctx.fillText('GAME OVER', (boardWidth/2) - 100, (boardHeight/2) - 100);
        ctx.fillText('SCORE: ' + score, (boardWidth/2) - 100, (boardHeight/2) - 65);
        ctx.fillText('HIGHSCORE: ' + highScore, (boardWidth/2) - 100, (boardHeight/2) - 30);
    }
}

const SpaceInvaders = () => {
    const canvasRef = React.useRef(null);
    const invader1Ref = React.useRef(null);   
    const shooterRef = React.useRef(null); 
    
    document.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
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
            case (32):
                player.shoot();
                break;
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
                    if (!interval) {
                        initialiseInvaders(canvasRef, invader1Ref, shooterRef); 
                    }
                    else {
                        clearInterval(interval);
                        score = 0;
                        lives = 3;
                        initialiseInvaders(canvasRef, invader1Ref, shooterRef); 
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