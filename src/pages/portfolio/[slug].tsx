import Head from "next/head";
import { GraphQLClient, gql } from "graphql-request";

function PagePortfolioItemBySlug({ portfolioItem }) {
  console.log({ portfolioItem });
  const { title } = portfolioItem;

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-10">
        <h1>{title}</h1>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const endpoint = process.env.GRAPHCMS_ENDPOINT;
  const graphQLClient = new GraphQLClient(endpoint);

  const query = gql`
    query PortfolioItemsWithSlugQuery {
      portfolioItems: portfolios {
        slug
      }
    }
  `;

  const { portfolioItems } = await graphQLClient.request(query);

  return {
    paths: portfolioItems.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const endpoint = process.env.GRAPHCMS_ENDPOINT;
  const graphQLClient = new GraphQLClient(endpoint);

  const query = gql`
    query PortfolioItemBySlugQuery($slug: String!) {
      portfolioItem: portfolio(where: { slug: $slug }) {
        title
        slug
        tags
        description
        date
        coverImage
        coverImageWidth
        coverImageHeight
        content
      }
    }
  `;

  const variables = { slug };

  const { portfolioItem } = await graphQLClient.request(query, variables);

  return {
    props: {
      portfolioItem,
    },
  };
}

export default PagePortfolioItemBySlug;
