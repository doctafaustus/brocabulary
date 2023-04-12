import '/styles/_global.css';

const randomId = Math.floor(Math.random() * 1000);

function MyApp({ Component, pageProps }) {
  return (
  <>
    <h1>randomId: {randomId}</h1>
    <Component {...pageProps} />
  </>
  )
}

export default MyApp
