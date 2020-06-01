import React, { useState } from 'react';
import Square from '../Square/Square';
import r2h from '../../img/r2h.png'
import fellowship from '../../img/fellowships.png'
import RestButton from '../ResetButton'

const Board = () => {
    // this renders a new game 
    const initialBoard = Array(9).fill(null)
    // creating HOOK
    const [squares, setSquares] = useState(initialBoard)
    // this determined who goes first
    const [playerXIsNext, setPlayerXIsNext] = useState(true)
    const renderSquare = (i) => {
        return <Square value={squares[i]} onClick={() => handleClick(i)} />
    }
    const handleClick = (i) => {
        const newSquares = [...squares]
        const winnerDeclared = Boolean(calculateWinner(squares))
        // this stops from changing the value once placed (X or O)
        const squareAlreadyFilled = Boolean(newSquares[i])
        if (winnerDeclared || squareAlreadyFilled) return
        newSquares[i] = playerXIsNext ? "X" : "O"
        // changing State?
        setSquares(newSquares)
        setPlayerXIsNext(!playerXIsNext)
    }
    // this determines if game is a DRAW
    const isBoardFull = (squares) => {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] == null) {
                return false
            }
        }
        return true
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
        // iterate over lines
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
            return "congrats " + winner
        } else if (isBoardFull(squares)) {
            return "its a draw"
        } else {
            return "next player is player " + (playerXIsNext ? "X" : "O")
        }
    }
    const restGame = () => {
        // setting state to inital value
        setSquares(initialBoard)
        setPlayerXIsNext(true)
    }
    return (
        <>
            <main className={`main--container ${(winner && getStatus() ===
                "congrats " + winner || !winner && getStatus() ===
                "its a draw" ? (getStatus() === "its a draw" ? "draw" : "winner") : (playerXIsNext ? "X" : "O"))}`}>
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
                    <RestButton onClick={restGame} />
                </div>
            </main>
        </>
    )
}
export default Board;