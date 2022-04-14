import Image from 'next/image';
import words from '/data/words.js';
import styles from '/components/card/card.module.scss';


export default function Card({ word, date }) {
  const wordObj = word || words.find(word => word.date === date);

  console.log('wordObj', wordObj);

  return (
    <div className={styles.card}>
      <h2 className="name">{ wordObj.name }</h2>
      <div className="date">{ wordObj.date }</div>
      <div className="definition">{ wordObj.definition }</div>
      <div className="sentence" 
        dangerouslySetInnerHTML={{__html: wordObj.sentence}}
      ></div>
      <Image
        src={wordObj.image}
        className="word-image"
        height={320}
        width={320}
        alt={wordObj.name}
      />
    </div>
  );
}