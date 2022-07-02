import words from '/data/words.js';
import { useState } from 'react';


export default function Quiz() {
  const limit = 3;
  const sample = words
    .map(x => ({ x, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(a => a.x)
    .slice(0, limit);

  const [quizWords, setQuizWords] = useState(sample);


  console.log(sample);


  return (
    <section className="quiz">
      <progress max="100" value="70"></progress>
      <div className="question-title">
        Which word means: {}
      </div>

      <ul className="answers">
        {quizWords.map((word, i) =>
          <li suppressHydrationWarning className="answer" key={i}>{ word.name }</li>
        )}
      </ul>
    </section>
  );
}


