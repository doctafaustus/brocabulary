import Image from 'next/image';
import words from '/data/words.js';
import styles from '/components/card/card.module.scss';
import { useState } from 'react';


export default function Card({ word, date }) {
  const [saved, setSaved] = useState(false);

  const wordObj = word || words.find(word => word.date === date);

  function favorite(e) {
    console.log('favorite');
  }

  return (
    <div 
      className={`${styles.card} ${ saved ? 'saved' : '' }`}
      onDoubleClick={() => setSaved(!saved)}
    >
      <div className="name-and-favorite">
        <h2 className="name">{ wordObj.name }</h2>
        <div className="favorite" onClick={favorite}></div>
      </div>
      <div className="definition">{ wordObj.definition }</div>
      <div className="sentence" 
        dangerouslySetInnerHTML={{__html: wordObj.sentence}}
      ></div>
      <div className="image-container">
        <Image
          src={wordObj.image}
          className="word-image"
          height={233}
          width={288}
          alt={wordObj.name}
        />
      </div>
    </div>
  );
}


