import styles from '/components/quiz/quiz.module.scss';
import words from '/data/words.js';
import { useState, useEffect } from 'react';

function getQuizWords() {
  const limit = 4;
  const quizWords = [...words]
    .map(x => ({ x, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(a => a.x)
    .slice(0, limit);

  const answerWord = quizWords[Math.floor(Math.random() * quizWords.length)];
  answerWord.isAnswer = true;

  return quizWords;
}


export default function Quiz() {
  const [game, setGame] = useState({ questionNum: 1 });
  const [quizWords, setQuizWords] = useState([]);

  // Needed to prevent React hydration error
  useEffect(() => {
    setQuizWords(getQuizWords());
  }, []);

  function processAnswer(e) {
    const selectedWordText = e.target.textContent;
    const selectedWordObj = quizWords.find(word => word.name === selectedWordText);
    selectedWordObj.selected = true;
    
    setQuizWords([...quizWords]);
    setTimeout(showResults, 750);
  }

  function getSelectedWord() {
    return quizWords.find(word => word.selected === true);
  }

  function getAnswerWord() {
    return quizWords.find(word => word.isAnswer);
  }

  function hasAnswered() {
    return getSelectedWord();
  }

  function showResults() {
    const selectedWord = getSelectedWord();
    const isCorrect = (selectedWord.name === getAnswerWord().name) ? true : false;

    selectedWord.isCorrect = isCorrect;
    setQuizWords([...quizWords]);
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
        {quizWords.map((word, i) =>
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
      <h6>{ JSON.stringify(getAnswerWord()) }</h6>
    </section>
  );
}


