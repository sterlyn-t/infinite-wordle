import './App.css';
import  Board  from '../src/components/Board';
import  Keyboard  from '../src/components/Keyboard';
import GameOver from './components/GameOver';
import { createContext, useEffect, useState } from 'react';
import { boardDefault, generateWordSet } from './Words';
 
export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({attempt: 0, letterPosition: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});
  const [correctWord, setCorrectWord] = useState("");

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
      console.log(words.todaysWord);
    })
  }, [])

  const onSelectLetter = (keyValue) => {
    if (currentAttempt.letterPosition > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition] = keyValue;
    setBoard(newBoard);
    setCurrentAttempt({...currentAttempt, letterPosition: currentAttempt.letterPosition + 1})
  }

  const onDelete = () => {
    if (currentAttempt.letterPosition === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt({...currentAttempt, letterPosition: currentAttempt.letterPosition - 1});
  }

  const onEnter = () => {
    if (currentAttempt.letterPosition !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++){
      currWord += board[currentAttempt.attempt][i];
      
    }
    let currentWord = currWord;
    currentWord += "\r";
    //currWord += "\r";

    if (wordSet.has(currentWord.toLowerCase())){
      setCurrentAttempt({attempt: currentAttempt.attempt + 1, letterPosition: 0});
      console.log(currentWord)
    }
    else {
      alert("Word not found");
      console.log(currentWord)
    }
    let correctModifiedWord = correctWord;
    if (currentWord.toLowerCase() === correctModifiedWord) {
      setGameOver({gameOver: true, guessedWord: true});
      return;
    }
    
    if (currentAttempt.attempt === 5){
      setGameOver({gameOver: true, guessedWord: false});
    }
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider 
       value={{
         board, 
         setBoard, 
         currentAttempt, 
         setCurrentAttempt, 
         onSelectLetter, 
         onEnter, 
         onDelete,
         correctWord,
         disabledLetters,
         setDisabledLetters,
         setGameOver,
         gameOver
         }}
         >
        <div className='game'>
        <Board />
        {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>

    </div>
  );
}

export default App;
