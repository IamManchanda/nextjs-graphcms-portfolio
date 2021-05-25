import Head from "next/head";
import { GraphQLClient, gql } from "graphql-request";

function PageIndex({ data }) {
  console.log({ data });
  return (
    <>
      <Head>
        <title>Next.js GraphCMS Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Welcome to our awesome portfolio</h1>
    </>
  );
}

export async function getStaticProps() {
  const endpoint = process.env.GRAPHCMS_ENDPOINT;
  const graphQLClient = new GraphQLClient(endpoint);

  const query = gql`
    query PostsAndPortfoliosQuery {
      posts {
        title
        slug
        description
        date
        id
        tags
        author {
          name
          image
          imageWidth
          imageHeight
        }
      }
      portfolios {
        title
        slug
        tags
        description
        date
        coverImage
        coverImageWidth
        coverImageHeight
      }
    }
  `;

  const data = await graphQLClient.request(query);

  return {
    props: {
      data,
    },
  };
}

export default PageIndex;
