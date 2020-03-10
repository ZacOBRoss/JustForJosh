import React from 'react'

class Board extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
          board: Array(1).fill([0,0]),
          rows: 12,
          cols: 12,
          interval: 1000
        };

        this.rowChange = this.rowChange.bind(this);
        this.colChange = this.colChange.bind(this);
        this.intervalChange = this.intervalChange.bind(this);
    }

    rowChange(event) {   
        this.setState({rows: parseInt(event.target.value)});
    }

    colChange(event) {
        this.setState({cols: parseInt(event.target.value)});
    }

    intervalChange(event) {
        this.setState({interval: parseInt(event.target.value)});
    }

    createBoard() {
        var gameBoard = [...Array(this.state.rows)].map(() => 
            Array(this.state.cols));

        for (var i = 0; i < this.state.rows; i++) {
            for (var j = 0; j < this.state.cols; j++) {
                var num = Math.random()
                
                if (num < 0.5) {
                    gameBoard[i][j] = 0;
                }
                else {
                    gameBoard[i][j] = 1;
                }
            }
        }

        this.setState({
            board: gameBoard
                });
    }

    cellClick(event) {
        switch(parseInt(event.target.value)) {
            case 0:
                event.target.value = 1;
                event.target.innerHTML = 1;
                break;
            default:
                event.target.value = 0;
                event.target.innerHTML = 0;
                break;
        }
    }

    runGame() {
        setInterval(() => {this.startGame()}, this.state.interval);
    }

    startGame() {
        var calcNextStep = () => {
            var gameBoard = [...this.state.board];
            for (var i = 0; i < this.state.rows; i++) {
                for (var j = 0; j < this.state.cols; j++) {
                    var neighbours = Array(8);
                    try {
                        neighbours[0] = this.state.board[i-1][j-1];
                    }
                    catch(err) {
                        neighbours[0] = 0;
                    }
                    try {
                        neighbours[1] = this.state.board[i-1][j];
                    }
                    catch(err) {
                        neighbours[1] = 0;
                    }
                    try {
                        neighbours[2] = this.state.board[i-1][j+1];
                    }
                    catch(err) {
                        neighbours[2] = 0;
                    }
                    try {
                        neighbours[3] = this.state.board[i][j-1];
                    }
                    catch(err) {
                        neighbours[3] = 0;
                    }
                    try {
                        neighbours[4] = this.state.board[i][j+1];
                    }
                    catch(err) {
                        neighbours[4] = 0;
                    }
                    try {
                        neighbours[5] = this.state.board[i+1][j-1];
                    }
                    catch(err) {
                        neighbours[5] = 0;
                    }
                    try {
                        neighbours[6] = this.state.board[i+1][j];
                    }
                    catch(err) {
                        neighbours[6] = 0;
                    }
                    try {
                        neighbours[7] = this.state.board[i+1][j+1];
                    }
                    catch(err) {
                        neighbours[7] = 0;
                    }

                    var neighboursClean = 
                    neighbours.map((val) => 
                        {
                            if (val !== 1) {
                                val = 0;
                            }
                            return val;
                        });

                    var total = neighboursClean.reduce(add, 0);

                    function add(total, num) {
                        return total + num;
                    }
                    
                    switch (gameBoard[i][j]) {
                        case 0:
                            switch (total) {
                                case 3:
                                    gameBoard[i][j] = 1;
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            switch (total) {
                                case 2:
                                    break;
                                case 3:
                                    break;
                                default:
                                    gameBoard[i][j] = 0;
                            }
                            break;
                    }
                }
            }
            return gameBoard;
        }
        var gameBoard = calcNextStep();
        this.setState({
            board: gameBoard
        });
    }

    render() {
        return (
            <div>
                <label>Rows</label>
                <input 
                    type="number" 
                    value={this.state.rows} 
                    onChange={this.rowChange}
                />
                <label>Columns</label>
                <input 
                    type="number"
                    value={this.state.cols}
                    onChange={this.colChange}
                />
                <button onClick={ () => 
                    this.createBoard() }>
                    Change Array
                </button>
                <label>Interval</label>
                <input
                    type='number'
                    value={this.state.interval}
                    onChange={this.intervalChange}
                />
                <button onClick={ () => this.runGame() }>
                    Start Game
                </button>
                
                <div className="boardRow">
                {this.state.board.map((square, index) => (
                    <div className="boardRow" key={index}>
                        {square.map((box, index) => (
                            <button 
                            className={`boardButton ${(box == 0) ? "zero" : "one" }`}
                            key={index}
                            value={box}
                            onClick={this.cellClick}>
                                {box}
                            </button>
                        ))}
                    </div>
                ))}
                </div>                
            </div>
        );
    }
}

const GameOfLife = () => (
    <div>
        <h1>Game Of Life</h1>
        <Board />
    </div>
    

)

export default GameOfLife