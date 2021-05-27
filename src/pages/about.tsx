import Head from "next/head";
import JumbotronAbout from "../components/jumbotron-about";

function PageAbout() {
  return (
    <>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <JumbotronAbout />
    </>
  );
}

export default PageAbout;
