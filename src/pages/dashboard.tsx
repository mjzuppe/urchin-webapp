import Head from 'next/head';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Playa - DashBoard</title>
      </Head>

      <h1>DashBoard Page</h1>
    </>
  );
}

// SSR or client side ??? Seems client side is needed for the data to be fetched
