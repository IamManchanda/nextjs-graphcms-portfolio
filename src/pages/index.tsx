import Head from "next/head";
import { GraphQLClient } from "graphql-request";

import JumbotronHero from "../components/jumbotron-hero";
import PortfolioItemsContainer from "../components/portfolio-items-container";
import BlogItemsContainer from "../components/blog-items-container";
import { FetchHomepageQuery } from "../lib/graphql/queries";

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
  const data = await graphQLClient.request(FetchHomepageQuery);

  return {
    props: {
      data,
    },
  };
}

export default PageIndex;
