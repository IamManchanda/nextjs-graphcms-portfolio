import Link from "next/link";
import Image from "next/image";
import { GraphQLClient, gql } from "graphql-request";

const graphQLClient = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);

function PagePortfolioItems({ portfolioItems }) {
  return (
    <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-0">
      <div className="mt-2 mb-8 text-3xl font-semibold text-gray-900 underline">
        All Projects
      </div>
      {portfolioItems?.map(
        ({
          title,
          slug,
          description,
          tags,
          coverImage,
          coverImageWidth,
          coverImageHeight,
        }) => (
          <div key={slug}>
            <Link href={`/portfolio/${slug}`}>
              <a>
                <div className="relative mb-10">
                  <div className="absolute z-10 w-full h-full bg-green-900 opacity-70" />
                  <div className="absolute z-20 flex flex-col items-center justify-center w-full h-full px-4 text-center">
                    <h3 className="text-2xl font-semibold text-white">
                      {title}
                    </h3>
                    <p className="hidden mt-3 text-lg leading-relaxed md:flex text-gray-50">
                      {description}
                    </p>
                    <div className="mt-3">
                      {tags.map((tag) => (
                        <span
                          className="px-2 py-1 m-2 text-sm tracking-wide text-white uppercase bg-green-700 rounded-lg"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Image
                    alt={title}
                    title={title}
                    src={`/images/portfolio-images/${coverImage}`}
                    width={coverImageWidth}
                    height={coverImageHeight}
                    layout="responsive"
                    className="absolute"
                  />
                </div>
              </a>
            </Link>
          </div>
        ),
      )}
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
