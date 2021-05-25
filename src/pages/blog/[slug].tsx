import Head from "next/head";
import { GraphQLClient, gql } from "graphql-request";

const endpoint = process.env.GRAPHCMS_ENDPOINT;
const graphQLClient = new GraphQLClient(endpoint);

function PageBlogItemBySlug({ blogItem }) {
  console.log({ blogItem });
  const { title } = blogItem;

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
  const query = gql`
    query BlogItemsWithSlugQuery {
      blogItems: posts {
        slug
      }
    }
  `;

  const { blogItems } = await graphQLClient.request(query);

  return {
    paths: blogItems.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const query = gql`
    query BlogItemBySlugQuery($slug: String!) {
      blogItem: post(where: { slug: $slug }) {
        title
        slug
        description
        date
        id
        tags
        content
        author {
          name
          image
          imageWidth
          imageHeight
        }
      }
    }
  `;

  const variables = { slug };

  const { blogItem } = await graphQLClient.request(query, variables);

  return {
    props: {
      blogItem,
    },
  };
}

export default PageBlogItemBySlug;
