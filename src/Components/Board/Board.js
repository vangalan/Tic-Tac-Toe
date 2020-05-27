import React, { useState } from 'react';
import Square from '../Square/Square';
import r2h from '../../img/r2h.png'
import fellowship from '../../img/fellowships.png'

const Board = () => {
//new blank game when reset 
    const initialBoard = Array(9).fill(null)
    const [squares, setSquares] = useState(initialBoard)
    //Player "X" always starts the game!
    const [playerXIsNext, setPlayerXIsNext] = useState(true)


    const renderSquare = (i) => {
        //helps render null, X, or O
        return <Square value={squares[i]} onClick={() => handleClick(i)} />
    }

    const handleClick = (i) => {
        const newSquares = [...squares]
        newSquares[i] = playerXIsNext ? "X" : "O"
        setSquares(newSquares)
        //toggling state on and off
        setPlayerXIsNext(!playerXIsNext)
    }

    const calculateWinner = (squares) => {
        /* Squares indexes as they appear in UI:
        0 1 2
        3 4 5
        6 7 8
        */
       const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
        ]; // shows all of the winning combinations ("lines")
        // Iterate over lines 
        for (let line of lines) {
            const [a, b, c] = line
            if (squares[a] && squares[a] === squares[b] &&
                squares[a] === squares[c]) {
                return squares[a]
                }
        }
        return null
    }

    const winner = calculateWinner(squares)

    const getStatus = () => {
        if (winner) {
            return "congrats player" + winner
        } else {
            return "Next player is player" + (playerXIsNext ? "X" : "O")
        }
    }

    return (
        <>
            <main className="main--container">
                <div className="logo">
                    <img src={r2h} alt="r2h logo" />
                    <img src={fellowship} alt="fellowship" />
                </div>
                <div className="status">
                   {getStatus()}
                </div>
                <div className="board--container">
                    <div className="board">
                        <div className="board--row">
                            {renderSquare(0)}
                            {renderSquare(1)}
                            {renderSquare(2)}
                        </div>
                        <div className="board--row">
                            {renderSquare(3)}
                            {renderSquare(4)}
                            {renderSquare(5)}
                        </div>
                        <div className="board--row">
                            {renderSquare(6)}
                            {renderSquare(7)}
                            {renderSquare(8)}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default Board;