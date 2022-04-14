import words from '/data/words.js'; 
import Card from '/components/card/card.js';

export default function FirstPost() {
  console.log(words);

  return (
    <>
      <h1>All Vocab Words</h1>
      {
        words.map(word => {
          return <Card word={word} key={word.name} />
        })
      }
    </>
  );
}