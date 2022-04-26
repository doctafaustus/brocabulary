import Head from 'next/head';
import Card from '/components/card/card.js';
import Nav from '/components/nav/nav.js';
import Link from 'next/link';


export default function Home() {
  const wordDays = 5;

  return (
    <>
      <Head>
        <title>Brocabulary</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Nav />
        <h1 className="main-title">Word of the Day</h1>

        <section className="cards-container">
          {[...Array(wordDays)].map((item, i) =>
            <Card date={getDate({ daysBehind: i })} key={i} />
          )}
        </section>

        <Link href="/all-words">
          <a className="see-more">See More</a>
        </Link>

      </main>
    </>
  );
}

// TODO: Server-side render this data
function getDate({ daysBehind }) {
  const date = new Date();
  const PrevDateTime = date.setDate(date.getDate() - daysBehind);

  return new Date(PrevDateTime).toLocaleDateString();
}
