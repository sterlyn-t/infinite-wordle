import React, { useContext } from 'react'
import { AppContext } from '../App'

function GameOver() {
    const { gameOver, setGameOver, correctWord, currentAttempt} = useContext(AppContext)
  return (
    <div className='gameOver'>
    <h3>{gameOver.guessedWord ? "You corrrectly guessed the word" : "You failed to guess the word"}</h3>
    <h1>Correct word: {correctWord}</h1>
    {gameOver.guessedWord && (<h3>You guessed in {currentAttempt.attempt} attempts.</h3>)}
    </div>
  )
}

export default GameOver