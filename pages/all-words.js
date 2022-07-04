import words from '/data/words.js'; 
import Card from '/components/card/card.js';
import Nav from '/components/nav/nav.js';

export default function AllWords() {

  return (
    <main>
      <Nav /> 
      <h1>All Vocab Words</h1>
      <section className="all-words">
        {
          words.map(word => {
            return <Card word={word} key={word.name} />
          })
        }
      </section>
    </main>
  );
}