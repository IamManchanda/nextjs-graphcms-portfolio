import Head from "next/head";
import { useRouter } from "next/router";
import { GraphQLClient, gql } from "graphql-request";

function PagePortfolioItemBySlug({ portfolioItem }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div className="p-10">Loading...</div>;
  }

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
    fallback: true,
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
    revalidate: 60,
  };
}

export default PagePortfolioItemBySlug;
