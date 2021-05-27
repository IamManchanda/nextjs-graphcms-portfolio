import Head from "next/head";
import { GraphQLClient, gql } from "graphql-request";

import JumbotronAbout from "../components/jumbotron-about";

const graphQLClient = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);

function PageAbout({ about }) {
  return (
    <>
      <Head>
        <title>About {about.name} - Next.js + GraphCMS</title>
      </Head>

      <JumbotronAbout name={about.name} biography={about.biography} />
    </>
  );
}

export async function getStaticProps() {
  const query = gql`
    query AboutpageQuery($slug: String!) {
      about: author(where: { slug: $slug }) {
        name
        biography
      }
    }
  `;

  const variables = {
    slug: "harry-manchanda",
  };

  const { about } = await graphQLClient.request(query, variables);

  return {
    props: {
      about,
    },
  };
}

export default PageAbout;
