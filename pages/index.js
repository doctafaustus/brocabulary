import Head from 'next/head';
import Card from '/components/card/card.js';
import Nav from '/components/nav/nav.js';
import Quiz from '/components/quiz/quiz.js';


export default function Home() {
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
        <h2 className="todays-date">{ getDate({ daysBehind: 0 }) }</h2>

        <section className="main-card-container">
          <Card date={getDate({ daysBehind: 0 })} />
        </section>

        <Quiz />
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
