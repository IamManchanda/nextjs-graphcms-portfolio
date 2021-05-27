import { GraphQLClient, gql } from "graphql-request";
import BlogItemsContainer from "../../components/blog-items-container";

const graphQLClient = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);

function PageBlogItems({ blogItems }) {
  return (
    <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-0">
      <div className="mt-20">
        <div className="mb-4 text-3xl font-semibold text-gray-900 underline">
          All Posts
        </div>
        <BlogItemsContainer blogItems={blogItems} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const query = gql`
    query BlogItemsQuery {
      blogItems: posts(orderBy: date_DESC) {
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

  const { blogItems } = await graphQLClient.request(query);

  return {
    props: {
      blogItems,
    },
  };
}

export default PageBlogItems;
