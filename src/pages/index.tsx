import Head from "next/head";
import Link from "next/link";
import { GraphQLClient, gql } from "graphql-request";

const endpoint = process.env.GRAPHCMS_ENDPOINT;
const graphQLClient = new GraphQLClient(endpoint);

function PageIndex({ data }) {
  return (
    <>
      <Head>
        <title>Next.js GraphCMS Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-10">
        <div>
          {data?.portfolioItems?.map(({ title, slug }) => (
            <div key={slug}>
              <Link href={`/portfolio/${slug}`}>
                <a>{title}</a>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10">
          {data?.blogItems?.map(({ title, slug }) => (
            <div key={slug}>
              <Link href={`/blog/${slug}`}>
                <a>{title}</a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const query = gql`
    query HomepageQuery {
      portfolioItems: portfolios {
        title
        slug
      }
      blogItems: posts {
        title
        slug
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
