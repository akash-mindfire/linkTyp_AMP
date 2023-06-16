// pages/index.js

import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Redirecting to index.html</title>
        <meta http-equiv="refresh" content="0; URL='/index.html'" />
      </Head>
      <div>
      </div>
    </>
  );
}
