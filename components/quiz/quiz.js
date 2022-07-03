import styles from '/components/quiz/quiz.module.scss';
import words from '/data/words.js';
import { useState, useEffect } from 'react';

function getQuizWords() {
  const limit = 4;
  const newWords = JSON.parse(JSON.stringify(words))
    .map(x => ({ x, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(a => a.x)
    .slice(0, limit);

  const answerWord = newWords[Math.floor(Math.random() * newWords.length)];
  answerWord.isAnswer = true;

  return newWords;
}


export default function Quiz() {
const [game, setGame] = useState({ internalQuestionNum: 1, quizWords: [] });

  // Needed to prevent React hydration error
  useEffect(() => {
    setGame({ ...game, quizWords: getQuizWords() });
  }, []);

  useEffect(() => {
    if (game.internalQuestionNum > 1) {
      console.log('Resetting...');
      setTimeout(() => {
        setGame({ ...game, quizWords: getQuizWords() });
      }, 2000);
    }
  }, [...Object.keys(game).map(key => game.internalQuestionNum)]);

  function processAnswer(e) {
    const selectedWordText = e.target.textContent;
    const selectedWordObj = game.quizWords.find(word => word.name === selectedWordText);
    selectedWordObj.selected = true;
    
    setGame({ ...game, quizWords: game.quizWords });
    setTimeout(showResults, 750);
  }

  function getSelectedWord() {
    return game.quizWords.find(word => word.selected === true);
  }

  function getAnswerWord() {
    return game.quizWords.find(word => word.isAnswer);
  }

  function hasAnswered() {
    return getSelectedWord();
  }

  function showResults() {
    const selectedWord = getSelectedWord();
    const isCorrect = (selectedWord.name === getAnswerWord().name) ? true : false;

    selectedWord.isCorrect = isCorrect;
    setGame({ ...game, quizWords: game.quizWords, internalQuestionNum: game.internalQuestionNum + 1 });
  }

  function getResultClass(word) {
    if (typeof word.isCorrect !== 'boolean') return '';
    return (word.isCorrect) ? 'correct' : 'incorrect';
  }


  return (
    <section className={styles.quiz}>
      <progress max="100" value="70"></progress>
      <div className="question-title">
        Which word means: <span className="question-definition">{getAnswerWord()?.definition}</span>
      </div>

      <div className="answers">
        {game.quizWords.map((word, i) =>
          <button 
            className={`answer ${word.selected ? 'selected' : ''} ${getResultClass(word)}`} 
            key={i}
            onClick={processAnswer}
            disabled={hasAnswered() ? true : false}
          >
            {word.name}
          </button>
        )}
      </div>
      <h6>{ JSON.stringify(game.questionNum) }</h6>
    </section>
  );
}


