import Head from "next/head";
import { GraphQLClient, gql } from "graphql-request";
import JumbotronAbout from "../components/jumbotron-about";
import { FetchAboutpageQuery } from "../lib/graphql/queries";

const graphQLClient = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);

function PageAbout({ about }) {
  return (
    <>
      <Head>
        <title>About {about.name}!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <JumbotronAbout name={about.name} biography={about.biography} />
    </>
  );
}

export async function getStaticProps() {
  const { about } = await graphQLClient.request(FetchAboutpageQuery, {
    slug: "harry-manchanda",
  });

  return {
    props: {
      about,
    },
  };
}

export default PageAbout;
