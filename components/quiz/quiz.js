import styles from '/components/quiz/quiz.module.scss';
import words from '/data/words.js';
import { useState, useEffect } from 'react';
import Progress from '/components/quiz/progress/progress.js';


const questionsLength = 5;

function getQuizWords(shownWords) {
  const limit = 4;
  const newWords = JSON.parse(JSON.stringify(words))
    .map(x => ({ x, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(a => a.x)
    .slice(0, limit);

  const answerWord = getRandomItem(newWords);

  if (shownWords?.includes(answerWord.name)) {
    return getQuizWords(shownWords);
  } 

  answerWord.isAnswer = true;
  return newWords;
}


function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]; 
}


export default function Quiz() {
  const [progress, setProgress] = useState({ completion: 0 });
  const [game, setGame] = useState({
    internalQuestionNum: 1,
    quizWords: [],
    results: [...Array(questionsLength)],
    shownWords: []
  });

  // Needed to prevent React hydration error
  useEffect(() => {
    setGame({ ...game, quizWords: getQuizWords() });
  }, []);

  useEffect(() => {
    // Change question
    if (game.internalQuestionNum > 1 && game.internalQuestionNum <= questionsLength) {
      console.log('Resetting...');
      setTimeout(() => {
        setGame({ ...game, quizWords: getQuizWords(game.shownWords) });
        setProgress({ completion: ((game.internalQuestionNum - 1) / (questionsLength - 1)) * 100});
      }, 3000);
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
    const answerWord = getAnswerWord();

    const isCorrect = (selectedWord.name === answerWord.name) ? true : false;
    const resultIndex = game.internalQuestionNum - 1;
    const shownWords = [...game.shownWords];

    selectedWord.isCorrect = isCorrect;
    game.results[resultIndex] = isCorrect;
    answerWord.revealAsAnswer = true;
    shownWords.push(answerWord.name);

    setGame({ 
      ...game,
      internalQuestionNum: game.internalQuestionNum + 1,
      shownWords
    });
  }

  function getResultClass(result) {
    if (typeof result !== 'boolean') return '';
    return (result) ? 'correct' : 'incorrect';
  }

  return (
    <section className={styles.quiz}>
      <h1>Daily Quiz</h1>

      <Progress progress={progress} game={game} getResultClass={getResultClass} />

      <div className="question-title">
        Which word means: <span className="question-definition">{getAnswerWord()?.definition}</span>
      </div>

      <div className="answers">
        {game.quizWords.map((word, i) =>
          <button 
            className={
              `answer ${word.selected ? 'selected' : ''} ${getResultClass(word.isCorrect)} ${word.revealAsAnswer ? 'correct' : ''}
            `} 
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


