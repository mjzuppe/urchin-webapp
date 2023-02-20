import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Playa - WebApp</title>
      </Head>

      <h1>Home Page</h1>
      <button
        type="button"
        onClick={() => {
          throw new Error("Sentry Frontend Error");
        }}
      ></button>
    </>
  );
}

// Use SSG here to get the data at build time
