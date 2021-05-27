import Head from "next/head";
import { GraphQLClient, gql } from "graphql-request";
import JumbotronHero from "../components/jumbotron-hero";
import PortfolioItemsContainer from "../components/portfolio-items-container";
import BlogItemsContainer from "../components/blog-items-container";

const graphQLClient = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);

function PageIndex({ data }) {
  return (
    <>
      <Head>
        <title>Full Stack Portfolio & Blog - Next.js & GraphCMS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <JumbotronHero />

      <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-0">
        <div className="mt-2 mb-8 text-3xl font-semibold text-gray-900 underline">
          Recent Projects
        </div>
        <PortfolioItemsContainer portfolioItems={data?.portfolioItems} />
      </div>

      <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-0">
        <div className="mt-20">
          <div className="mb-4 text-3xl font-semibold text-gray-900 underline">
            Recent Posts
          </div>
          <BlogItemsContainer blogItems={data?.blogItems} />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const query = gql`
    query HomepageQuery {
      portfolioItems: portfolios(first: 2, orderBy: date_DESC) {
        title
        slug
        description
        tags
        coverImage
        coverImageWidth
        coverImageHeight
      }
      blogItems: posts(first: 2, orderBy: date_DESC) {
        title
        slug
        date
        description
        author {
          name
        }
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
