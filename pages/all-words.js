import words from '/data/words.js'; 
import Card from '/components/card/card.js';
import Nav from '/components/nav/nav.js';

export default function FirstPost() {
  console.log(words);

  return (
    <main>
      <Nav />

        <h1>All Vocab Words</h1>
      {
        words.map(word => {
          return <Card word={word} key={word.name} />
        })
      }
    </main>
  );
}