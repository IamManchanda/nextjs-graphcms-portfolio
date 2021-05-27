import { GraphQLClient, gql } from "graphql-request";
import PortfolioItemsContainer from "../../components/portfolio-items-container";

const graphQLClient = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);

function PagePortfolioItems({ portfolioItems }) {
  return (
    <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-0">
      <div className="mt-2 mb-8 text-3xl font-semibold text-gray-900 underline">
        All Projects
      </div>
      <PortfolioItemsContainer portfolioItems={portfolioItems} />
    </div>
  );
}

export async function getStaticProps() {
  const query = gql`
    query PortfolioItemsQuery {
      portfolioItems: portfolios(orderBy: date_DESC) {
        title
        slug
        description
        tags
        coverImage
        coverImageWidth
        coverImageHeight
      }
    }
  `;

  const { portfolioItems } = await graphQLClient.request(query);

  return {
    props: {
      portfolioItems,
    },
  };
}

export default PagePortfolioItems;
