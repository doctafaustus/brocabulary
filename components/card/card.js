import Image from 'next/image';
import words from '/data/words.js';
import styles from '/components/card/card.module.scss';


export default function Card({ word, date }) {
  console.log({date});

  const wordObj = word || words.find(word => word.date === date);

  return (
    <div className={styles.card}>
      <div className="name-and-date">
        <h2 className="name">{ wordObj.name }</h2>
        <div className="date">{ wordObj.date }</div>
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